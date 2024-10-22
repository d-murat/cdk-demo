#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DemoCdkStack } from '../lib/demo-cdk-stack';
import { AwsSolutionsChecks, HIPAASecurityChecks } from 'cdk-nag';

const app = new cdk.App();
const demoStack = new DemoCdkStack(app, 'DemoCdkStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});

cdk.Tags.of(demoStack).add('Service', 'DemoService')

cdk.Aspects.of(demoStack).add(new AwsSolutionsChecks())
cdk.Aspects.of(demoStack).add(new HIPAASecurityChecks())
