terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
}

resource "azurerm_resource_group" "rg" {
  name     = var.resource_group_name
  location = var.location
}

resource "azurerm_static_web_app" "web" {
  name                = var.static_site_name
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku_tier            = "Free"
  sku_size            = "Free"
}

output "static_site_api_token" {
  value       = azurerm_static_web_app.web.api_key
  sensitive   = true
  description = "API token for GitHub Actions deployment"
}

output "static_site_url" {
  value       = azurerm_static_web_app.web.default_host_name
  description = "Default hostname of the static site"
}
