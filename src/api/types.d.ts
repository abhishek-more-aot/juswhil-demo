import { Icon } from 'element-ui'

export interface IReportAbuseData {
  id: number
  videoId: number
  reportedBy: number
  status: number | null
  adminId: number
  video?: any
}

export interface IReportAbuseAnalyticData {
  id: number
  enabled: boolean
  videoId: number
  status: number | null
  count: number
  user?: any
}

export interface IBookmarkData {
  id: number
  videoId: number
  userBy: number
}

export interface ITeamData {
  id: number
  teamId: String
  teamName: String
  createdBy: number
  createdByFullName?: string,
  shortDescription: String
  cityId: number
  teamLogo: string
  captainId: number
  viceCaptainId: number
  numberOfMembers: number
  teamRating: Number
  numberOfFollowers: Number
}

export interface IAdminsRoleData {
  id: number
  enabled: boolean
  name: string
}
export interface IReasonData {
  id: number
  enabled: boolean
  reason: string
}

export interface IGSTData {
  id: number
  enabled: boolean
  hsncode: string
  gstPercentage: any
}

export interface IAdminData {
  id: number
  enabled: boolean
  fullName: string
  email: string
  contactNumber: string
  password: string | null
  avatar: string
  gender: number | null
  adminsRoleId: number | null,
  lastLogin: string,
  createdBy?: number,
  createdByFullName?: string,
  adminsRole: {
    id: number | null,
    name: string
  }
}

export interface ICategoryData {
  id: number
  enabled: boolean | null
  name: string,
  image: string,
  // price: number | null,
  isDeleted: boolean,
  priority: number
  createdByFullName: string
  isSubCategory: boolean;
}

export interface ITestimonialData {
  id: number
  enabled: boolean | null
  name: string,
  image: string | null,
  review: string,
  location: string,
  // isDeleted: boolean,
  // priority: number 
  // createdByFullName: string 
}

export interface ISubCategoryData {
  id: number
  enabled: boolean | null
  name: string,
  image: string,
  feature: boolean,
  isDeleted: boolean,
  priority: number
  createdByFullName: string;
  categoriesId: number | null;
}
export interface IFeedbackData {
  id: number
  enabled: boolean | null
  feedback: string
  rating: number
  ratingType: number
  userId: number
}
export interface IEventData {
  id: number
  enabled: boolean | null
  eventName: string
  status: number
  featuredImage: string
  startDate: string
  endDate: string
  winnerDeclarationDate: string
  numberOfWinners: number
  description: string
  termsAndCondition: string
  refreshInterval: string
}

export interface IEventPrizeData {
  id: number
  enabled: boolean | null
  eventId: number | null
  userId: number | null
  winnerNumber: number | null
  prizeName: string
  prizeImage: string
  rating: number | null
  winnings: string
}

export interface IEventUserData {
  id: number
  enabled: boolean | null
  eventId: number
  userId: number
  rating: number

}

export interface ILearningData {
  id: number
  enabled: boolean | null
  name: string
  featuredImage: string
  youtubeLink: string
  priorityAdded: number
  description: string
  categoriesId: number | null
  styleId: number | null
  style?: any
  categories?: any
}
export interface IContactCoachData {
  id: number
  enabled: boolean
  coachId: number
  userId: number
  status: number
}
export interface ISettingData {
  id: number,
  enabled: boolean,
  version: string,
  appName: string,
  shareAppMessage: string,
  contactNumber: string,
  playstoreLink: string,
  appstoreLink: string,
  iosVersion: string,
  whatappNumber: string,
  aboutUsLink: string,
  contactUsLink: string,
  termsAndConditionsLink: string,
  privacyPolicyLink: string
}
export interface IStyleData {
  id: number
  enabled: boolean | null
  name: string,
  icon: string,
  visibility: boolean,
  categoriesId: number | null,
  priority: number
}

export interface ICommentTemplateData {
  id: number
  enabled: boolean | null
  comment: string
  categoriesId: number | null
  categories?: any
  style?: any
  styleId: number | null
  createdBy: number
}
export interface IVideoData {
  id: number
  enabled: boolean | null
  file: string
  rejectReason: string
  visibility: number
  userId: number
  categoriesId: number | null
  styleId: number | null
  videoRating: number
  thumbnail: string
  averagePeerRating: number
  averageCoachRating: number
  totalNumberOfUsersRated: number
  totalNumberOfCoachesRated: number
  totalViewsCount: number
  description: string
  totalCommentsCount: number
  totalBookmarksCount: number
  style?: {}
  categories?: {}
}
export interface ITournamentData {
  id: number
  enabled: boolean | null
  typeOfGame: string
  location: string
  facultyId: number
  from: string
  to: string
  bookingType: string
  createdTimestamp?: string | null
  createdBy?: number | null
  updatedBy?: number | null
  updatedTimestamp?: string | null
}
export interface ICountryData {
  id: number
  enabled: boolean
  name: string
  code: string
  icon: string
  zipCodeMinLength: number
  zipCodeMaxLength: number
}
export interface IStateData {
  id: number
  name: string
  countryId: number
  
}
// export interface IStateData {
//   id: number
//   enabled: boolean
//   name: string
//   icon: string
//   countryId: number | undefined,
//   country: {
//     id: number | undefined
//   }
// }

// export interface ICityData {
//   id: number
//   enabled: boolean
//   name: string
//   icon: string
//   tags: string
//   coordinates: string
//   stateId: number | undefined
//   countryId: number | undefined
//   country: {
//     id: number | undefined
//   }
//   state: {
//     id: number | undefined
//   }
// }
export interface ICityData {
  id: number
  enabled: boolean
  name: string
  tags:string
  pincode:string
  coordinates:string
  stateId: number
  countryId: number
}

export interface IUsersRoleData {
  id: number
  enabled: boolean
  name: string
}

export interface ICommentsData {
  id: number
  videoId: number
  userBy: number
  comment: string
  commentTemplateId: number
}

export interface IAmenityData {
  id: number
  enabled: boolean
  name: string
  icon: string
}

// export interface ICategoryData {
//   id: number
//   enabled: boolean
//   name: string
//   icon: string
//   markerIcon: string
// }

export interface IBusinessData {
  id: number
  enabled: boolean
  name: string
}

// export interface IBrandData {
//   id: number
//   enabled: boolean
//   name: string
// }

export interface ICompanyData {
  id: number
  enabled: boolean
  name: string
}

export interface ISiteData {
  id: number
  enabled: boolean
  name: string
  companyId: number | undefined
  company: {
    id: number | undefined
  }
}

export interface ILocationData {
  id: number
  enabled: boolean
  contactNumber1: string | null
  contactNumber2: string | null
  address: string | null
  spocName: string | null
  spocEmail: string | null
  spocContactNumber: string | null
  coordinate: string | null
  pincode: string | null
  hotDesking: string | null
  externalLink: string | null
  siteId: number | null
  site: {
    id: number | null
  }
  companyId: number | null
  company: {
    id: number | null
  }
  businessId: number | null
  business: {
    id: number | null
  }
  brandId: number | null
  brand: {
    id: number | null
  }
  categoryId: number | null
  category: {
    id: number | null
  }
  stateId: number | null
  state?: {
    id: number | null
  }
  countryId: number | null
  country?: {
    id: number | null
  }
  cityId: number | null
  city?: {
    id: number | null
  }
}

export interface IDiscoverData {

  id: number
  enabled: boolean
  title: string
  subTitle: string | null
  description: string | null
  image: string | null
  link: string | null
  howToRedeem: string | null
  expiryDate: string | null
  spocName: string | null
  spocEmail: string | null
  spocContactNumber: string | null
  contract: string | null
  businessId: number | null
  business: {
    id: number | null
  }
  companyId: number | null
  company: {
    id: number | null
  }
  discoverCategoryId: number | null
  discoverCategory: {
    id: number | null
  }
  stateId: number | null
  state: {
    id: number | null
  }
  countryId: number | null
  country: {
    id: number | null
  }
  cityId: number | null
  city: {
    id: number | null
  }
  categoryId: number | null,
  category: {
    id: number | null
  }
  siteId: number | null,
  site: {
    id: number | null
  }
  brandId: number | null,
  brand: {
    id: number | null
  }
}

export interface IDiscoverCategoryData {
  id: number
  enabled: boolean
  name: string
  icon: string
}

export interface IVolunteerData {
  id: number
  enabled: boolean
  fullName: string
  email: string | null
  contactNumber: string | null
  locationId: number | null
  location: {
    id: number | null
  }
}

export interface ILocationsPhotoData {
  id: number
  enabled: boolean
  image: string | null
  locationId: number | null
  location: {
    id: number | null
  }
  userId: number | null
  user: {
    id: number | null
  }
  adminId: number | null
  admin: {
    id: number | null
  }
}

export interface INotificationsData {
  id: number
  enabled: boolean
  title: string
  message: string | null
  image: string | null
  sendToAll: boolean
  topic: string

  // state: {
  //   id: number | null,
  // }

  // city: {
  //   id: number | null,
  // }

}

export interface INewsData {
  id: number;
  priority: number;
  source:string;
  enabled: boolean;
  description: string;
  link: string | null;
  image: string | null;
}
export interface IAwardData {
  id: number;
  priority: number;
  source:string;
  enabled: boolean;
  description: string;
  link: string | null;
  image: string | null;
}
export interface ICareerData {
  id: number;
  number: number | null;
  name:string;
  enabled: boolean;
  designation: string;
  uploadResume: string;
  
}
export interface IArrivalsData {
  id: number;
  enabled: boolean;
  image: string | null;
  name: string;
}

export interface IReviewData {
  id: number
  serviceRating: string
  appExperience: string
  comments: string | null
}
export interface ILocationsAmenityData {
  id: number
  amenityIds: any | undefined
  amenities: any | undefined
}

export interface ITitlesData {
  id: number;
  bookId: string;
  title: string;
  parentId: string;
  order: number;
  isChild: boolean;
  pdf: string;
  createdBy: number;
  createdTimestamp: string;
  updatedBy: number;
  updatedTimestamp: string;
  enabled: boolean;

}

export interface IUsersData {
  id: number,
  fullName: String;
  email: String;
  userType: number | null;
  pincode: number | null;
  enabled: boolean;
  companyName: string;
  isDeleted: boolean;
  adminId:number | null;
  countryId:number;
  state:any,
  stateId:number |null,
  cityId:number |null,
  city:any
}
export interface IUsersContactData {
  id: number,
  enabled: boolean;
  fullName: string,
  email: string,
  message: string,
  contactNumber: string

}
export interface IBannerData {
  id: number;
  enabled: boolean;
  image: string,
  order: number | null,
  name: string,
}

export interface ITrendingData {
  id: number;
  enabled: boolean;
  image: string,
  title: string,
  modelNo: string,
  modelName: string,
}

export interface IWarrantyData {
  id: number;
  enabled: boolean;
  firstName: string;
  lastName: string;
  contactNumber: string,
  email: string,
  productsId: number | null;
  purchasedFromId: number | null;
  purchasedDate: string;
  invoice: string;
  comments: string;
  categoriesId: number | null;
}

export interface IGalleryData {
  id: number;
  enabled: boolean;
  image: string;
  order: number | null;
  clickCount: number;
  priority: number;
  createdTimestamp?: string;
  createdBy: number;
  redirectionOption: number | null;
  redirectionValue: number | null;
}

export interface IEnquiryData{
  id: number,
  enabled: true,
  name: string,
  number: string,
  email: string,
  message: string
}

export interface ICallbackData{
  id: number,
  enabled: boolean,
  isIntrested: boolean,
  isContacted: boolean,
  number: string
}

export interface IProductData {
  id: number;
  enabled: boolean;
  name: string;
  image: string;
  gstId?: string;
  modelNumber: string;
  // rating: number;
  new: boolean;
  inStock: boolean;
  freeDelivery: boolean;
  topSelling: boolean;
  trending: boolean;
  priority: number;
  description: string;
  productImages: any;
  video: string;
  cnfPrice?: number
  superStockistPrice?: number
  cdPrice?: number
  sdPrice?: number
  copPrice?: number
  sopPrice?: number
  mrpPrice?: number
  wbPrice?: number
  categoriesId: number | null;
  optionIds: number | null;
  subCategoryId: number | null
  isDeleted: boolean
  qtymultiplier: number
  unitId?: number | null
  unit?: any
  gst?: {
    id: any
  }
}

export interface IUnitData {
  id: number
  enabled: boolean
  name: string
  multiplier: number
  finalunits: string
}

export interface IProductOptionValueData {
  id: number;
  enabled: boolean;
  optionValueId: number | null;
  productOptionId: number | null;
  priority: 0;
}
export interface IProductOptionData {
  id: number;
  enabled: boolean;
  productId: number | null;
  optionId: number | null;
}
export interface IProductOptionValuesData {
  id: number;
  enabled: boolean;
  optionValueId: number | null;
  productOptionId: number | null;
  priority: 0;
  cnfPrice?: number
  superStockistPrice?: number
  cdPrice?: number
  sdPrice?: number
  copPrice?: number
  sopPrice?: number
  mrpPrice?: number
  wbPrice?: number
}
export interface IOptionData {
  id: number;
  enabled: boolean;
  name: string;
  image: string;
}
export interface IOptionValuesData {
  id: number;
  enabled: boolean;
  name: string;
  optionsId: number;
}
export interface IOrderData {
  id: number,
  enabled: boolean;
  isEdited: boolean;
  userId: number | null;
  addToCartIds: any | null;
  status: number;
  addToCart: any;
  invoice: any;
  isDeleted: boolean;
  reason: string;
  multiplier: string;
  document: any;
}

export interface IDocumentsData{
  id: number
  enabled: boolean
  title: string
  tags:any
 
  document: string 
  orderId: number | null
 
}

export interface ICartData {
  id: number,
  enabled: boolean;
  userId: number
  options: any
  productId: number
  orderId: number
  quantity: number
  status: number

}
