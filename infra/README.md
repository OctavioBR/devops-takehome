# pulumi-eks
The architecture includes a VPC with public and private subnets and deploys an Amazon EKS cluster that provides a managed Kubernetes control plane. Kubernetes worker nodes are deployed on private subnets for improved security. Load balancers created by workloads deployed on the EKS cluster will be automatically created in the public subnets.
![architecture](https://www.pulumi.com/templates/kubernetes/aws/architecture.png)

When the deployment completes, Pulumi exports the following stack **output** values:

| Value         | Description                                                                 |
|---------------|-----------------------------------------------------------------------------|
| `kubeconfig ` | The cluster’s kubeconfig file which you can use with `kubectl` to access and communicate with your clusters. |

## Stacks
- **dev** → `us-east-1` aws region, in a `10.0.0.0/22` CIDR VPC
