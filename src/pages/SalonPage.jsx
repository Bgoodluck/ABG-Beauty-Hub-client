import React from "react";
import OurPolicy from "../components/OurPolicy";
import NewsletterBox from "../components/NewsletterBox";
import SalonBanner from "../components/SalonBanner";
import VerticalCardStaff from "../components/VerticalCardStaff";
import Title from "../components/Title";
import HorizontalSalonProductCard from "../components/HorizontalSalonProductCard";
import ClientsReviews from "./ClientsReviews";
import SalonHeroPage from "./SalonHeroPage";

function SalonPage() {
  return (
    <div>
      <SalonBanner />
      <VerticalCardStaff
        staffCategory={["stylist", "make-up", "barber", "manicure"]}
        heading={<Title text1={"ABG"} text2={"Stylists"} />}
      />
      <SalonHeroPage />
      <HorizontalSalonProductCard
        heading={<Title text1={"ABG"} text2={"Salon Products"} />}
      />
      <ClientsReviews
        heading={<Title text1={"Customer"} text2={"Reveiws"} />}
      />
      <OurPolicy />
      <NewsletterBox />
    </div>
  );
}

export default SalonPage;
