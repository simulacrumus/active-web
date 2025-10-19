import React, { useEffect, useState } from "react";
import { MainLayout } from "@layouts";
import {
  Header,
  FilterList,
  ScheduleList,
  Modal,
  TermsContent,
} from "@components";
import { LocationProvider, ScheduleProvider } from "./contexts";
import { useTranslation } from "react-i18next";

function App() {
  const [hasAccepted, setHasAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { i18n } = useTranslation();

  useEffect(() => {
    const termsAccepted = sessionStorage.getItem("termsAccepted");
    if (termsAccepted === "true") {
      setHasAccepted(true);
    }
    setIsLoading(false);
  }, []);

  const handleAccept = () => {
    sessionStorage.setItem("termsAccepted", "true");
    setHasAccepted(true);
  };

  if (isLoading) {
    return null;
  }

  return (
    <>
      {!hasAccepted && (
        <Modal>
          <TermsContent onAccept={handleAccept} language={i18n.language} />
        </Modal>
      )}

      <LocationProvider>
        <ScheduleProvider>
          <MainLayout
            header={<Header />}
            sidebar={<FilterList />}
            children={<ScheduleList />}
          >
            <ScheduleList />
          </MainLayout>
        </ScheduleProvider>
      </LocationProvider>
    </>
  );
}

export default App;
