import * as pulumi from "@pulumi/pulumi";
import * as awsx from "@pulumi/awsx";
import * as eks from "@pulumi/eks";

const config = new pulumi.Config();
const stack = pulumi.getStack();

const vpc = new awsx.ec2.Vpc(`vpc-${stack}`, {
  enableDnsHostnames: true,
  cidrBlock: config.get("vpcNetworkCidr"),
});

const eksCluster = new eks.Cluster("green", {
  vpcId: vpc.vpcId, // Put the cluster in the new VPC created earlier
  authenticationMode: eks.AuthenticationMode.Api, // Use the "API" authentication mode to support access entries
  publicSubnetIds: vpc.publicSubnetIds, // Public subnets will be used for load balancers
  privateSubnetIds: vpc.privateSubnetIds,// Private subnets will be used for cluster nodes
  instanceType: config.get("eksNodeInstanceType"),
  desiredCapacity: config.getNumber("desiredClusterSize"),
  minSize: config.getNumber("minClusterSize"),
  maxSize: config.getNumber("maxClusterSize"),
  nodeAssociatePublicIpAddress: false, // Do not give the worker nodes public IP addresses
  endpointPrivateAccess: false,
  endpointPublicAccess: true,
  clusterTags: { stack },
  tags: { stack }
});

export const kubeconfig = eksCluster.kubeconfig;
