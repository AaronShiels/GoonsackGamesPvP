terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.37.0"
    }
  }

  backend "s3" {
    profile = "personal"
    region  = "us-west-2"

    bucket = "aaronshiels-state"
    key    = "pvp.goonsackgames.com/terraform.tfstate"
  }
}
