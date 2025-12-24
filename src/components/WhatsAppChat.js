import { CustomWhatsappBox } from "@/styles/homepage/social";
import { WhatsApp } from "@mui/icons-material";
import { useRouter } from "next/router";

export default function WhatsAppChat() {
  const router = useRouter();

  return (
    <CustomWhatsappBox
      asPath={router.asPath.indexOf("/customize") >= -1 ? true : false}
      className="whatsAppChat left"  
    >
      <a
        target="_blank"
        // href="https://wa.me/+97180073327"
        href="https://wa.me/971506342193?text=.مرحبًا%20سيدار،%20أود%20أن%20أعرف%20المزيد%20عن%20عروضكم%0AHello%20Sedar,%20I’d%20like%20to%20inquire%20about%20your%20offers."
        rel="noreferrer"
        aria-label="Whatsapp Me"
      >
        <WhatsApp
          sx={{
            marginTop: "4px",
            fontSize: (theme) => theme.typography.typography39,
            color: (theme) => theme.palette.common.white,
          }}
        />
      </a>
    </CustomWhatsappBox>
  );
}
