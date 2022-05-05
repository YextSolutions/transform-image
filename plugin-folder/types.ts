export interface PrimaryPhoto {
  image: { url: string };
}

export interface BeverageEntity {
  entityId: string;
  primaryProfile: {
    primaryPhoto?: PrimaryPhoto;
  };
}
