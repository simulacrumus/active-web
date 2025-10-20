import { useState, useEffect, ReactNode } from "react";

const terms = {
  en: {
    title: "Terms and Conditions",
    intro:
      "By using this application, you acknowledge and agree to the following terms and conditions. Please read them carefully before proceeding.",
    disclaimer: {
      title: "Important Disclaimer",
      content:
        "This is NOT an official City of Ottawa application. This app is an independent tool created to help residents find and organize information about drop-in activities offered by the City of Ottawa.",
    },
    dataAccuracy: {
      title: "Data Accuracy and Limitations",
      intro: "Please be aware of the following limitations:",
      items: [
        {
          label: "Data Source",
          text: "All activity information is automatically collected from the City of Ottawa's public website",
        },
        {
          label: "Accuracy",
          text: "The data may not always be accurate, complete, or up-to-date",
        },
        {
          label: "Missing Information",
          text: "Some activities, schedules, or facility details may be missing or incomplete",
        },
        {
          label: "Incorrect Data",
          text: "There may be errors in activity times, locations, or descriptions",
        },
        {
          label: "Closures & Holidays",
          text: "This app does not account for facility closures, statutory holidays, or special events that may affect activity schedules",
        },
        {
          label: "Real-Time Changes",
          text: "Last-minute cancellations or schedule changes may not be reflected in the app",
        },
      ],
    },
    verification: {
      title: "Official Source Verification",
      intro:
        "Always verify information with official sources. For the most accurate and up-to-date information, please check:",
      items: [
        "The official City of Ottawa website",
        "Contact the facility directly",
        "Call the City of Ottawa recreation services",
      ],
    },
    purpose: {
      title: "App Purpose",
      intro: "This application is designed solely to:",
      does: [
        "Organize publicly available activity information in an easy-to-browse format",
        "Provide search and filtering capabilities to help you find suitable activities",
        "Allow sorting by location and other criteria",
        "Enable you to save interesting activities to your personal calendar",
      ],
      doesNot: "This app does not:",
      doesNotItems: [
        "Handle registrations or bookings",
        "Provide real-time availability",
        "Replace official City of Ottawa communications",
      ],
    },
    privacy: {
      title: "Privacy and Permissions",
      location: {
        label: "Location Services",
        intro: "This app may request access to your location to:",
        items: [
          "Sort activities and facilities by distance from your current location",
          "Provide personalized recommendations based on proximity",
        ],
      },
      calendar: {
        label: "Calendar Access",
        intro: "This app may request access to your calendar to:",
        items: [
          "Save activity schedules and reminders to your personal calendar",
          "Help you track activities you're interested in attending",
        ],
      },
      footer:
        "Your location and calendar data are used only for these purposes and are not shared with third parties.",
    },
    liability: {
      title: "Limitation of Liability",
      intro: "The creators of this app are not responsible for:",
      items: [
        "Any inconvenience caused by inaccurate information",
        "Missed activities due to outdated or incorrect schedules",
        "Facility closures or changes not reflected in the app",
        "Any issues arising from reliance on the app's data",
      ],
    },
    updates: {
      title: "Updates and Changes",
      items: [
        "The app's data is updated regularly, but we cannot guarantee the frequency or completeness of updates",
        "These terms may be updated from time to time",
        "Continued use of the app constitutes acceptance of any changes",
      ],
    },
    contact: {
      title: "Contact and Support",
      content:
        "This is an independent project created to benefit the Ottawa community. For official information about City of Ottawa recreation services, please visit the official City website or contact the appropriate municipal departments.",
    },
    agreement: {
      text: "By tapping",
      button: '"I Agree"',
      continuation:
        "below, you acknowledge that you have read, understood, and agree to these terms and conditions, and that you will verify all activity information through official sources before attending any activities.",
    },
    agreeButton: "I Agree",
  },
  fr: {
    title: "Conditions d'utilisation",
    intro:
      "En utilisant cette application, vous reconnaissez et acceptez les conditions d'utilisation suivantes. Veuillez les lire attentivement avant de continuer.",
    disclaimer: {
      title: "Avis Important",
      content:
        "Ceci n'est PAS une application officielle de la Ville d'Ottawa. Cette application est un outil indépendant créé pour aider les résidents à trouver et organiser l'information concernant les activités libres offertes par la Ville d'Ottawa.",
    },
    dataAccuracy: {
      title: "Exactitude des Données et Limitations",
      intro: "Veuillez prendre note des limitations suivantes :",
      items: [
        {
          label: "Source des données",
          text: "Toute l'information sur les activités est automatiquement recueillie du site web public de la Ville d'Ottawa",
        },
        {
          label: "Exactitude",
          text: "Les données peuvent ne pas toujours être exactes, complètes ou à jour",
        },
        {
          label: "Information manquante",
          text: "Certaines activités, horaires ou détails d'installations peuvent être manquants ou incomplets",
        },
        {
          label: "Données incorrectes",
          text: "Il peut y avoir des erreurs dans les heures d'activités, les emplacements ou les descriptions",
        },
        {
          label: "Fermetures et congés",
          text: "Cette application ne tient pas compte des fermetures d'installations, des jours fériés ou des événements spéciaux qui pourraient affecter les horaires d'activités",
        },
        {
          label: "Changements en temps réel",
          text: "Les annulations de dernière minute ou les changements d'horaire peuvent ne pas être reflétés dans l'application",
        },
      ],
    },
    verification: {
      title: "Vérification avec les Sources Officielles",
      intro:
        "Vérifiez toujours l'information avec les sources officielles. Pour l'information la plus exacte et à jour, veuillez consulter :",
      items: [
        "Le site web officiel de la Ville d'Ottawa",
        "Communiquer directement avec l'installation",
        "Appeler les services de loisirs de la Ville d'Ottawa",
      ],
    },
    purpose: {
      title: "Objectif de l'Application",
      intro: "Cette application est conçue uniquement pour :",
      does: [
        "Organiser l'information publiquement disponible sur les activités dans un format facile à consulter",
        "Fournir des capacités de recherche et de filtrage pour vous aider à trouver des activités qui vous conviennent",
        "Permettre le tri par emplacement et autres critères",
        "Vous permettre de sauvegarder des activités intéressantes dans votre calendrier personnel",
      ],
      doesNot: "Cette application ne permet pas de :",
      doesNotItems: [
        "Gérer les inscriptions ou les réservations",
        "Fournir la disponibilité en temps réel",
        "Remplacer les communications officielles de la Ville d'Ottawa",
      ],
    },
    privacy: {
      title: "Confidentialité et Permissions",
      location: {
        label: "Services de géolocalisation",
        intro:
          "Cette application peut demander l'accès à votre localisation pour :",
        items: [
          "Trier les activités et installations par distance de votre emplacement actuel",
          "Fournir des recommandations personnalisées basées sur la proximité",
        ],
      },
      calendar: {
        label: "Accès au calendrier",
        intro:
          "Cette application peut demander l'accès à votre calendrier pour :",
        items: [
          "Sauvegarder les horaires d'activités et rappels dans votre calendrier personnel",
          "Vous aider à suivre les activités auxquelles vous souhaitez participer",
        ],
      },
      footer:
        "Vos données de localisation et de calendrier sont utilisées uniquement à ces fins et ne sont pas partagées avec des tiers.",
    },
    liability: {
      title: "Limitation de Responsabilité",
      intro:
        "Les créateurs de cette application ne sont pas responsables pour :",
      items: [
        "Tout inconvénient causé par de l'information inexacte",
        "Des activités manquées à cause d'horaires désuets ou incorrects",
        "Les fermetures d'installations ou changements non reflétés dans l'application",
        "Tout problème découlant de la dépendance aux données de l'application",
      ],
    },
    updates: {
      title: "Mises à Jour et Modifications",
      items: [
        "Les données de l'application sont mises à jour régulièrement, mais nous ne pouvons garantir la fréquence ou l'exhaustivité des mises à jour",
        "Ces conditions peuvent être mises à jour de temps à autre",
        "L'utilisation continue de l'application constitue l'acceptation de tout changement",
      ],
    },
    contact: {
      title: "Contact et Support",
      content:
        "Ceci est un projet indépendant créé pour bénéficier à la communauté d'Ottawa. Pour l'information officielle concernant les services de loisirs de la Ville d'Ottawa, veuillez visiter le site web officiel de la Ville ou contacter les départements municipaux appropriés.",
    },
    agreement: {
      text: "En appuyant sur",
      button: '"J\'accepte"',
      continuation:
        "ci-dessous, vous reconnaissez avoir lu, compris et accepté ces conditions d'utilisation, et que vous vérifierez toute l'information sur les activités par les sources officielles avant de participer à toute activité.",
    },
    agreeButton: "J'accepte",
  },
};

interface TermsContentProps {
  onAccept: () => void;
  language?: "en" | "fr";
}

export const TermsContent: React.FC<TermsContentProps> = ({
  onAccept,
  language = "en",
}) => {
  const t = terms[language];

  return (
    <div className="p-8 max-w-3xl bg-white text-gray-900">
      <h1 className="text-3xl font-bold text-center mb-6">{t.title}</h1>

      <div className="mb-8">
        <p className="text-base mb-8">{t.intro}</p>
      </div>

      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-semibold mb-4">{t.disclaimer.title}</h3>
          <p className="mb-4">
            <strong className="font-semibold">{t.disclaimer.content}</strong>
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-4">{t.dataAccuracy.title}</h3>
          <p className="mb-4">
            <strong className="font-semibold">{t.dataAccuracy.intro}</strong>
          </p>
          <ul className="list-disc pl-5 space-y-2">
            {t.dataAccuracy.items.map((item, i) => (
              <li key={i}>
                <strong className="font-semibold">{item.label}</strong>:{" "}
                {item.text}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-4">{t.verification.title}</h3>
          <p className="mb-4">
            <strong className="font-semibold">{t.verification.intro}</strong>
          </p>
          <ul className="list-disc pl-5 space-y-2">
            {t.verification.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-4">{t.purpose.title}</h3>
          <p className="mb-4">{t.purpose.intro}</p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            {t.purpose.does.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <p className="mb-4">
            <strong className="font-semibold">{t.purpose.doesNot}</strong>
          </p>
          <ul className="list-disc pl-5 space-y-2">
            {t.purpose.doesNotItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-4">{t.privacy.title}</h3>
          <p className="mb-4">
            <strong className="font-semibold">
              {t.privacy.location.label}
            </strong>
            : {t.privacy.location.intro}
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            {t.privacy.location.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <p className="mb-4">
            <strong className="font-semibold">
              {t.privacy.calendar.label}
            </strong>
            : {t.privacy.calendar.intro}
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            {t.privacy.calendar.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <p>{t.privacy.footer}</p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-4">{t.liability.title}</h3>
          <p className="mb-4">{t.liability.intro}</p>
          <ul className="list-disc pl-5 space-y-2">
            {t.liability.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-4">{t.updates.title}</h3>
          <ul className="list-disc pl-5 space-y-2">
            {t.updates.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-4">{t.contact.title}</h3>
          <p>{t.contact.content}</p>
        </section>

        <hr className="border-t border-gray-300 my-8" />

        <div className="text-center">
          <p className="text-base font-semibold mb-6">
            {t.agreement.text}{" "}
            <span className="font-bold">{t.agreement.button}</span>{" "}
            {t.agreement.continuation}
          </p>

          <button
            onClick={onAccept}
            className="px-1 py-2 rounded-full hover:bg-gray-100 transition-all"
          >
            <span className="px-4 py-2 bg-gray-700 text-white rounded-full ">
              {t.agreeButton}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
