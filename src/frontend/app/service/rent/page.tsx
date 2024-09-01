import "rsuite/dist/rsuite.min.css";
import BookingFlowControl from "../../../components/rent/bookFlowControl";
import { Suspense } from "react";

export default function RentPage(){
    return(
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <BookingFlowControl />
            </Suspense>
      </div>
    )
}