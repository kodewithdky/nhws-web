import societyCertificate from "../../../src/assets/certificates/society_certificate.jpg";
import twelve_a from "../../../src/assets/certificates/12A_certificate_page.jpg";
import eight_g from "../../../src/assets/certificates/80G_certificate_pag.jpg";
import ImageCard from "../../../utils/ImageCard";
import Layout from "../../layout/Layout";

const Certificate = () => {
  const SO_CERTIFICATE =
    "Namaskar Humanity Welfare Society Registration Certificate (Issued by Govt. Of Uttar Pradesh, Under Act 21 Of 1860)";
  const TWA = "12A Certificate (Issued by Commissioner of Income tax)";
  const EIGH = "80G Certificate (Issued by Commissioner of Income tax)";

  return (
    <Layout
      title={"Namaskar Humanity Welfare Society -Certificate"}
      description={
        "Namaskar Humanity Welfare Society is a 12A & 80G registered NGO dedicated to uplifting marginalized communities and promoting social welfare. With a verified certificate, we stand as a credible organization committed to transparency, accountability, and impactful change. Our focus spans across education, healthcare, women empowerment, and environmental sustainability, aiming to create lasting improvements in the lives of the underprivileged. The verified certificate reinforces our legitimacy, ensuring that donors, partners, and beneficiaries can trust our initiatives to foster meaningful and sustainable development for all."
      }
      keywords={"help, educate, donate, welfare society"}
    >
      <section className="py-12 sm:py-12 lg:py-16">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="w-full mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl xl:text-5xl mb-6 text-blue-900">
              Our goverment verified certificates!
            </h2>
            <p className="mb-4">
              Namaskar Humanity Welfare Society is a 12A & 80G registered NGO
              dedicated to uplifting marginalized communities and promoting
              social welfare. With a verified certificate, we stand as a
              credible organization committed to transparency, accountability,
              and impactful change. Our focus spans across education,
              healthcare, women empowerment, and environmental sustainability,
              aiming to create lasting improvements in the lives of the
              underprivileged. The verified certificate reinforces our
              legitimacy, ensuring that donors, partners, and beneficiaries can
              trust our initiatives to foster meaningful and sustainable
              development for all.
            </p>
          </div>
          <div className="grid max-w-4xl lg:max-w-6xl grid-cols-1 mx-auto mt-8 text-center gap-y-4 sm:gap-x-8 sm:grid-cols-2 lg:grid-cols-3 sm:mt-12 lg:mt-20 sm:text-left">
            <ImageCard image={societyCertificate} title={SO_CERTIFICATE} />
            <ImageCard image={twelve_a} title={TWA} />
            <ImageCard image={eight_g} title={EIGH} />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Certificate;
