# Azure Static Web App Deployment

## Setup

### 1. Azure Prerequisites
- Azure subscription (you already have this)
- Azure CLI installed: `brew install azure-cli`

### 2. GitHub Secrets
Add these to your GitHub repo settings (Settings → Secrets and variables → Actions):

**Required:**
- `AZURE_STATIC_WEB_APPS_API_TOKEN` - Get from Terraform output after running `terraform apply`

### 3. Terraform Setup

```bash
cd terraform

# Login to Azure
az login

# Initialize Terraform
terraform init

# Create terraform.tfvars with your values
cat > terraform.tfvars << EOF
subscription_id = "YOUR_SUBSCRIPTION_ID"
resource_group_name = "personalweb-rg"
location = "westus2"
static_site_name = "personalweb"
EOF

# Plan and apply
terraform plan
terraform apply
```

After `terraform apply`, copy the `static_site_api_token` output and add it as `AZURE_STATIC_WEB_APPS_API_TOKEN` secret in GitHub.

### 4. Deploy
Push to `main` branch. GitHub Actions will automatically deploy.

## Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `subscription_id` | - | Your Azure subscription ID (required) |
| `resource_group_name` | `personalweb-rg` | Resource group name |
| `location` | `westus2` | Azure region |
| `static_site_name` | `personalweb` | Static web app name |

## Get Your Subscription ID

```bash
az account show --query id -o tsv
```

## Cleanup

```bash
cd terraform
terraform destroy
```
