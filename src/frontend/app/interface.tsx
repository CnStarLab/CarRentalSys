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
  
  interface Car {
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
  