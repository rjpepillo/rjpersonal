/**
 * Created by jayuyao on 11/17/2016.
 */
  ///<reference path="../../../typings/index.d.ts" />
declare namespace model {

  interface HttpError {
    status: number;
    data: {
      message: string,
      errorCode: string
    }
  }

  interface NavItem {
    name: string;
    selected: boolean;
    state: string;
  }

  interface JwtToken {
    refreshToken: string;
    accessToken: string;
  }

  interface AccessToken extends angular.jwt.JwtToken {
    tenantUserContext: TenantUserContext[];
  }

  interface TenantUserContext {
    accessLevels: Array<ResourcePermission>;
    features: FeatureModel[];
    landingPage: string;
    mobileAccess: boolean;
    role: string;
    tenantId: number;
    userId: number;
  }

  interface ResourcePermission {
    resource: string;
    accessLevel: number;
  }

  interface UserResponse {
    user: UserModel;
    customFieldList: CustomFieldModel[];
  }

  interface UploadFileResponse {
    headers: string[];
    filename: string;
  }

  interface RfidResponse {
    id: number;
    rfid: string;
    userResponse: UserResponse;
  }

  interface PhotoUploadResponse {
    Bucket: string;
    Key: string;
    Location: string;
  }

}



