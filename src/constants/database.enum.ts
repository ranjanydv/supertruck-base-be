export enum DATABASE_TABLES {
  USERS = 'users',
  ROLES = 'roles',
  BROKER = 'broker',
  INVOICES = 'invoices',
  LOADS = 'Loads',
  COMMUNICATIONS = 'communication',
  DOCUEMENT = 'document',
  DOCUEMENT_TYPE = 'document_type',
  DRIVER = 'driver',
  DRIVER_SCHEDULE = 'driver_schedule',
  LOAD_ASSIGNMENTS = 'loadassignments',
  DISPACTHER = 'dispatcher',
  DRIVER_LOG = 'driver_log',
  OTP = 'otp',
  NOTIFICATION_TOKEN = 'notification_token',
  NOTIFICATION = 'notification',
  LOAD_REQUEST = 'load_request'
}

export enum DATABASE_FK {
  FK_MANUFACTURER_ROLE = 'fk_manufacturer_role',
  FK_LOAD_LOAD_REQUEST = 'fk_load_request',
  FK_DRIVER_LOAD_REQUEST = 'fk_driver_request'

}
