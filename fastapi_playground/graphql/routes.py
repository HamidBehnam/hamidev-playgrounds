from fastapi import Request
from fastapi.security import HTTPAuthorizationCredentials
from strawberry import Schema
from strawberry.fastapi import GraphQLRouter
from fastapi_playground.core.auth import verify_token
from fastapi_playground.graphql.types import Query, Mutation


async def get_context(
    request: Request,
):
    headers_dict = dict(request.headers)

    if "authorization" not in headers_dict:
        query_params = dict(request.query_params)
        token = query_params.get("token", "No Token")
    else:
        token = headers_dict.get("authorization").split(" ")[1]

    auth_credentials: HTTPAuthorizationCredentials = HTTPAuthorizationCredentials(scheme="Bearer", credentials=token)
    payload = await verify_token(auth_credentials)

    return {
        "current_user": payload,
    }

schema = Schema(query=Query, mutation=Mutation)

graphql_router = GraphQLRouter(schema=schema, context_getter=get_context)
