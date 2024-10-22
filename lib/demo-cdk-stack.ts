import * as cdk from 'aws-cdk-lib';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import path = require('path');

export class DemoCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new cdk.aws_dynamodb.TableV2(this, 'DemoTable', {
          partitionKey: { name: 'pk', type: cdk.aws_dynamodb.AttributeType.STRING },
          removalPolicy: cdk.RemovalPolicy.DESTROY
    })

    const logGroup = new cdk.aws_logs.LogGroup(this, 'DemoLogGroup', {
        removalPolicy: cdk.RemovalPolicy.DESTROY,
    })

    const fn = new NodejsFunction(this, 'DemoLambda', {
        handler: 'createItemHandler',
        entry: path.join(__dirname, './createItem.ts'),
        runtime: Runtime.NODEJS_20_X,
        environment: { TABLE_NAME: table.tableName },
        logGroup
    })
    fn.addToRolePolicy(new PolicyStatement({
        actions: ["dynamodb:PutItem"],
        resources: [table.tableArn]
    }))
}
}
