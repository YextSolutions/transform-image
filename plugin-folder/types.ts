export interface WebhookPayload {
  changedFields: ChangedFields;
  entityId: string;
  primaryProfile: PrimaryProfile;
  meta: {
    eventType: string;
  };
}
export interface PrimaryProfile {
  primaryPhoto: PrimaryPhoto;
}
export interface PrimaryPhoto {
  image: Image;
}
export interface Image {
  url: string;
}
export interface ChangedFields {
  fieldNames: string[];
}
