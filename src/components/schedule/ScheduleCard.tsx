import { useLocation } from "@hooks/useLocation";
import type { Schedule } from "@types";
import {
  Calendar,
  Clock,
  ExternalLink,
  Globe,
  MapPin,
  MoreVertical,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

type ScheduleCardProps = {
  schedule: Schedule;
};

export const ScheduleCard: React.FC<ScheduleCardProps> = ({ schedule }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();
  const { calculateDistance } = useLocation();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const h = parseInt(hours);
    const locale = i18n.language;

    if (locale === "fr" || locale === "fr-CA") {
      // French Canadian format: "9 h 30" or "22 h" (no minutes if 0)
      return minutes === "00" ? `${h} h` : `${h} h ${minutes}`;
    } else {
      // English format: "9:30 AM" or "10:00 PM"
      const ampm = h >= 12 ? "PM" : "AM";
      const hour12 = h % 12 || 12;
      return `${hour12}:${minutes} ${ampm}`;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(
      i18n.language === "fr" || i18n.language === "fr-CA" ? "fr-CA" : "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  const getDistanceString = ({
    longitude,
    latitude,
  }: {
    longitude: number;
    latitude: number;
  }) => {
    if (!calculateDistance) return null;
    const distanceMeters = calculateDistance({ longitude, latitude });
    if (distanceMeters == null) return null;
    if (distanceMeters < 1000) {
      return `${Math.round(distanceMeters)} m`;
    }
    return `${(distanceMeters / 1000).toFixed(1)} km`;
  };

  const handleReservation = () => {
    window.open(schedule.facility.reservationUrl, "_blank");
    setIsMenuOpen(false);
  };

  const handleWebsite = () => {
    window.open(schedule.facility.url, "_blank");
    setIsMenuOpen(false);
  };

  const handleMapClick = () => {
    window.open(
      `https://www.google.com/maps?q=${schedule.facility.latitude},${schedule.facility.longitude}`,
      "_blank"
    );
    setIsMenuOpen(false);
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm duration-200">
      {/* Header */}
      <div className="px-6 pt-5 flex items-start justify-between">
        <h2 className="text-xl font-semibold text-gray-900 mb-1 flex-1">
          {schedule.activity.title}
        </h2>

        {/* Menu Button */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors duration-150"
            aria-label="More options"
          >
            <MoreVertical size={20} />
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-auto min-w-max">
              <div className="py-1">
                <button
                  onClick={handleReservation}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 w-full"
                >
                  <ExternalLink size={16} className="text-gray-400" />
                  <span>{t("schedule.reserve")}</span>
                </button>
                <button
                  onClick={handleWebsite}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 w-full"
                >
                  <Globe size={16} className="text-gray-400" />
                  <span>{t("schedule.facility.visitWebsite")}</span>
                </button>
                <button
                  onClick={handleMapClick}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 w-full"
                >
                  <MapPin size={16} className="text-gray-400" />
                  <span>{t("schedule.facility.viewOnMap")}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-5 space-y-4">
        {/* Time Info */}
        <div className="flex items-start gap-3">
          <div className="mt-0.5 text-gray-400">
            <Clock size={18} />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">
              {t(`dayOfWeek.day.${schedule.dayOfWeek}.full`)}
            </div>
            <div className="text-sm text-gray-600 mt-0.5">
              {formatTime(schedule.startTime)} - {formatTime(schedule.endTime)}
            </div>
          </div>
        </div>

        {/* Period Info */}
        <div className="flex items-start gap-3">
          <div className="mt-0.5 text-gray-400">
            <Calendar size={18} />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">
              {t("schedule.date.period")}
            </div>
            <div className="text-sm text-gray-600 mt-0.5">
              {formatDate(schedule.periodStartDate)} -{" "}
              {formatDate(schedule.periodEndDate)}
            </div>
          </div>
        </div>

        {/* Facility Details */}
        <div className="flex items-start gap-3">
          <div className="mt-0.5 text-gray-400">
            <MapPin size={18} />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">
              {schedule.facility.title}
            </div>
            <div className="text-sm text-gray-600 mt-0.5">
              {schedule.facility.address}
              {getDistanceString({
                longitude: schedule.facility.longitude,
                latitude: schedule.facility.latitude,
              }) && (
                <>
                  {" "}
                  &bull;{" "}
                  {getDistanceString({
                    longitude: schedule.facility.longitude,
                    latitude: schedule.facility.latitude,
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
