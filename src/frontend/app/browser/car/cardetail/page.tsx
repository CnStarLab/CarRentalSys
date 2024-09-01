import CarDetailComponent from "@/components/carDetail/cardetail";
import { Suspense } from "react";

export default function carDetailPage (){
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CarDetailComponent />
        </Suspense>
        
    )
}