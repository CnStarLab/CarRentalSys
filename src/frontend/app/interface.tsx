import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReactNode } from "react";

interface Comment2CarPic {
  fileName: string;
  comment2CarId: number;
}
  
interface Comment2Car {
  bookId: number;
  userId: number;
  carId: number;
  titleContent: string;
  mainContent: string;
  likes: number;
  photos: Comment2CarPic[];
}

interface CarsPic {
  fileName: string;
  carId: number;
}

export interface Car {
  ID: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;  
  brand: string;
  model: string;
  carType: string;
  basicInfo: string;
  featureInfo: string;
  location: string;
  supportDriver: boolean;
  supportDelivery: boolean;
  ownerId: number;
  numSeats: number;
  year: number;
  price: number;
  rating: number;
  available: boolean;
  comments2car: Comment2Car[];
  carPics: CarsPic[];
  useLogs: any[]; // Assuming UserCar structure is not provided, using any for now
}

export interface ProtectedRouteProps {
  children: ReactNode;
}

export interface AuthContextType {
  username: string;
  isLoggedIn: boolean;
  logout: () => void;
  login:(
          router:AppRouterInstance,
          username:string,
          userId:string,
          token:string,
          currAvatar:string
        ) => void;
  avatar?: string;
  userId: string;
}

export interface Order {
  ID: number;
  createdAt: string;  // 对应 gorm.Model 中的 CreatedAt
  updatedAt: string;  // 对应 gorm.Model 中的 UpdatedAt
  deletedAt: string | null;  // 对应 gorm.Model 中的 DeletedAt
  UserId: number;
  carId: number;
  startTime: number;
  endTime: number;
  status: number;
  reason: number;
  totalPrice: number;
}

export interface UserProfile {
  ID: number;  // 对应 gorm.Model 中的 ID
  createdAt: string;  // 对应 gorm.Model 中的 CreatedAt
  updatedAt: string;  // 对应 gorm.Model 中的 UpdatedAt
  deletedAt: string | null;  // 对应 gorm.Model 中的 DeletedAt

  username: string;  // 对应 `Username`
  email: string;  // 对应 `Email`
  password: string;  // 对应 `Password`
  firstName: string;  // 对应 `FirstName`
  lastName: string;  // 对应 `LastName`
  userPic: string;  // 对应 `UserPic`

  comments2user: Comment2User[];  // 对应 `Comments`
  favoriteCars: FavoriteCar[];  // 对应 `Favorit`
  myCars: Car[];  // 对应 `MyCars`
}

interface FavoriteCar {
  carId: number;  // 对应 `CarID`
  userId: number;  // 对应 `UserId`
}

interface Comment2User {
  bookId: number;  // 对应 `BookId`
  userId: number;  // 对应 `UserId`
  carId: number;  // 对应 `CarId`
  titleContent: string;  // 对应 `TitleContent`
  mainContent: string;  // 对应 `MainContent`
  likes: number;  // 对应 `Likes`
  photos: Comment2UserPic[];  // 对应 `PicNames`
}

// Interface for Comment2UserPic
interface Comment2UserPic {
  fileName: string;  // 对应 `FileName`
  comment2CarId: number;  // 对应 `Comment2UserID`
}

