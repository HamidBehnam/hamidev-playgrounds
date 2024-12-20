import jwt
from jwt import PyJWKClient
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from typing import Annotated, Optional
from fastapi_playground.core.environment import get_settings
from fastapi_playground.core.logger import logger

oauth2_scheme = HTTPBearer()


class AuthError(HTTPException):
    def __init__(self, detail: str, status_code: int = status.HTTP_401_UNAUTHORIZED):
        super().__init__(status_code, detail)


async def verify_token(token: Annotated[Optional[HTTPAuthorizationCredentials], Depends(oauth2_scheme)]):
    settings = get_settings()

    try:
        jwks_client = PyJWKClient(
            f"https://{settings.AUTH0_DOMAIN}/.well-known/jwks.json")
        signing_key = jwks_client.get_signing_key_from_jwt(token.credentials).key
        payload = jwt.decode(
            token.credentials,
            signing_key,
            algorithms=settings.AUTH0_ALGORITHMS,
            audience=settings.AUTH0_AUDIENCE,
            issuer=f"https://{settings.AUTH0_DOMAIN}/"
        )
        return payload
    except jwt.ExpiredSignatureError:
        logger.error("Token is expired")
        raise AuthError("Token is expired")
    except jwt.InvalidAudienceError:
        logger.error("Invalid audience")
        raise AuthError("Invalid audience")
    except jwt.InvalidIssuerError:
        logger.error("Invalid issuer")
        raise AuthError("Invalid issuer")
    except jwt.DecodeError as error:
        logger.error(f"Decode error: {error}")
        raise AuthError(f"Decode error: {error}")
    except Exception as e:
        logger.error(f"Token validation error: {str(e)}")
        raise AuthError(f"Token validation error: {str(e)}")


async def get_current_user(token: Annotated[Optional[HTTPAuthorizationCredentials], Depends(oauth2_scheme)]):
    payload = await verify_token(token)
    return payload
