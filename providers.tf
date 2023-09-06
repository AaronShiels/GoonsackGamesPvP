provider "aws" {
  region = "us-west-2"

  default_tags {
    tags = {
      project = "pvp.goonsackgames.com"
      version = var.project_version
    }
  }
}

# https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cnames-and-https-requirements.html#https-requirements-certificate-issuer
provider "aws" {
  region = "us-east-1"
  alias  = "certificate"

  default_tags {
    tags = {
      project = "pvp.goonsackgames.com"
      version = var.project_version
    }
  }
}
