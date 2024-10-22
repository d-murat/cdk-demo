import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient()

export async function createItemHandler(event: { pk: string, data: string}) {
    const command = new PutItemCommand({
        TableName: process.env.TABLE_NAME,
        Item: {
            pk: { S: event.pk },
            data: { S: event.data}
        }
    })

    await client.send(command)
}
