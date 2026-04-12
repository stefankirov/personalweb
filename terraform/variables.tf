variable "subscription_id" {
  description = "Azure subscription ID"
  type        = string
  sensitive   = true
}

variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
  default     = "personalweb-rg"
}

variable "location" {
  description = "Azure region"
  type        = string
  default     = "westus2"
}

variable "static_site_name" {
  description = "Name of the static web app"
  type        = string
  default     = "personalweb"
}
