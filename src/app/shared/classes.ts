/**
 * Created by jayuyao on 11/22/2016.
 */
class UserModel {
  id: number;
  active: boolean;
  role: RoleModel;
  tenant: TenantModel;
}

class CustomFieldModel {
  id: number;
  customFieldDefinition: CustomFieldDefinitionModel;
  value: string;
  user: UserModel;
}

class UserRequest {
  id: number;
  role: RoleModel;
  tenant: TenantModel;
  customFieldList: CustomFieldModel[];
  url: string;
}

class ContactPersonModel {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  display: string;
}

class RoleModel {
  id: number;
  name: string;
  displayName: string;
  description: string;
  permissions: PermissionModel[];
  tenant: TenantModel;
  roleConfig: RoleConfigModel;
}

class RoleConfigModel {
  id: number;
  features: FeatureModel[];
  landingPage: string;
}

class PermissionModel {
  id: number;
  access: number;
  resource: string;
}

class FeatureModel {
  id: number;
  name: string;
  screens: string;
  access: FeatureAccess;
}

class Feature {
  feature: string;
  screens: string[];
}

class SelectItemModel {
  id: number;
  name: string;
}

class TenantModel {
  id: number;
  name: string;
  imageUrl: string;
}

class TerminalModel {
  id: number;
  location: string;
  tenantId: number;
  uid: string;
  active: boolean;
}

class RFIDModel {
  id: number;
  rfid: string;
}

class FieldModel {
  position: number;
  label: string;
  csvMap: string;
  selectedField: string;
  isIdentifier: boolean;
  tenant: TenantModel;
  role: RoleModel;
  csvOptions: any[];
}

class UploadResultModel {
  role: RoleModel;
  headers: string[];
  filename: string;
}

class SaveRequestModel {
  role: RoleModel;
  headers: string[];
  filename: string;
  fields: FieldModel[];
  url: string;
}

class CustomFieldDefinitionModel{
  id: number;
  defaultField: boolean;
  description: string;
  disabled: boolean;
  fieldId: string;
  fieldType: number;
  label: string;
  tenant: TenantModel;
  role: RoleModel;
  active: boolean;
  displayed: boolean;
  lastModifiedBy: string;
  lastModifiedDate: Date;
  required: boolean;
  sequence: number;
}

interface SaveResponseModel {
  lineNumber: number;
  uploaded: boolean;
  resultMessage: string;
}

class ResetPasswordRequestModel {
  token: string;
  oldPassword: string;
  email: string;
}

class CustomFieldDefinitionRequest {
  id: number;
  description: string;
  displayed: boolean;
  fieldId: string;
  fieldTypeId: number;
  label: string;
  lastModifiedBy: string;
  required: boolean;
  roleId: number;
  sequence: number;
  tenantId: number;
}
