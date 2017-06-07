/**
 * Created by jpepillo on 01/18/2017.
 */
/* Any changes done here should match the one in core */
enum Role{
  ADMINISTRATOR = {id: 1, name: "Administrator"},
  PRIMARY = {id: 2, name: "Primary"},
  SECONDARY = {id: 3, name: "Secondary"},
  TERMINAL = {id: 4, name: "Terminal"},
  STUDENT = {id: 5, name: "Student"}
}

enum Features{
  CUSTOM_FIELDS = "Custom Fields",
  MOBILE_PRIMARY = "Mobile (Primary)",
  MOBILE_TERMINAL = "Mobile (Terminal)",
  ROLES = "Roles",
  SETTINGS = "Settings",
  TERMINALS = "Terminals",
  USERS = "Users",
  PROFILE = "Profile",
  DOWNLOAD_APP = "Download App"
}

enum FeatureAccess{
  READ, WRITE, ADMIN
}

enum State{
  INDEX = 'index',
  LOGIN = 'index.login',
  FORGOT_PASSWORD = 'index.forgotpassword',
  RESET_PASSWORD = 'index.resetpassword',

  APP = 'app',
  DASHBOARD = 'app.dashboard',

  //  CUSTOM FIELD DEFINITION
  CUSTOM_FIELD_DEFINITION_LIST = 'app.customFieldDefinition.list',
  CUSTOM_FIELD_DEFINITION_ADD = 'app.customFieldDefinition.add',

  //USERS
  USER_MAIN = 'app.users',
  USER_LIST = 'app.users.list',
  USER_ADD_MAIN = 'app.users.add.main',
  USER_EDIT_MAIN = 'app.users.edit.main',
  USER_ADD_SUB = 'app.users.sub.add',
  USER_ADD_SUB_NEW = 'app.users.sub.add.new',
  USER_EDIT_SUB = 'app.users.sub.edit',
  USER_UPLOAD = 'app.users.upload',

  TERMINALS = 'app.terminals',

  //ROLES
  ROLE_MAIN = 'app.roles',
  ROLE_LIST = 'app.roles.list',
  ROLE_ADD = 'app.roles.add',
  ROLE_EDIT = 'app.roles.edit',

  RFID = 'app.rfid'
}

enum RelationshipTypes {
  PRIMARY_STUDENT = {name:Role.PRIMARY['name'] + "-" + Role.STUDENT['name']},
  PRIMARY_SECONDARY = {name: Role.PRIMARY['name'] + "-" + Role.SECONDARY['name']}
}

/* Any changes done here should match the one in core */
enum DefaultFieldId {
  FIRST_NAME = {id: "firstName"},
  MIDDLE_NAME = {id: "middleName"},
  LAST_NAME = {id: "lastName"},
  RFID = {id: "rfid"},
  USER_ID = {id: "userId"}, //can be translated to Student Number, Employee Number, etc.
  EMAIL = {id: "email"},
  CONTACT_NUMBER = {id: "contactNumber"},
  IMAGE_URL = {id: "imageUrl"},
  CONTACT_PERSON = {id: "contactPerson"},
  HAS_MOBILE_ACCESS = {id: "hasMobileAccess"},
  PRIMARY_SECONDARY_CONTACT = {id: "primaryContact"}
}

/* Any changes done here should match the one in core */
enum FieldType {
  TEXT = { id: 1, name: "Text" },
  NUMBER = { id: 2, name: "Number" },
  DATE = { id: 3, name: "Date" },
  TOGGLE = { id: 4, name: "Toggle" },
  PHOTO = { id: 5, name: "Photo" }
}



