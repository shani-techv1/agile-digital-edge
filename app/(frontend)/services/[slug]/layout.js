import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import { servicesData } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = servicesData[slug];
  if (!service) return {};
  return buildMetadata({
    title: `${service.title} | Agile Digital Edge`,
    description: service.description,
    path: `/services/${slug}`,
  });
}

export default async function ServiceSlugLayout({ children, params }) {
  const { slug } = await params;
  const service = servicesData[slug];
  if (!service) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.title, path: `/services/${slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          serviceSchema({
            name: service.title,
            description: service.description,
            path: `/services/${slug}`,
          }),
        ]}
      />
      {children}
    </>
  );
}
