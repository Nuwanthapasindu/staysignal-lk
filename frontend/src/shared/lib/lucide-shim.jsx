import React, { forwardRef } from 'react';

const Icon = forwardRef(function Icon(
  { size = 16, color = 'currentColor', strokeWidth = 2, className, ...rest },
  ref
) {
  return (
    <svg ref={ref} xmlns="http://www.w3.org/2000/svg" width={size} height={size}
      viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...rest}>
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
});

export default Icon;

export const AlertCircle = Icon;
export const AlertTriangle = Icon;
export const ArrowRight = Icon;
export const BookOpen = Icon;
export const Bookmark = Icon;
export const Calendar = Icon;
export const CameraOff = Icon;
export const Check = Icon;
export const CheckCircle2 = Icon;
export const CheckSquare = Icon;
export const ChevronDown = Icon;
export const ChevronLeft = Icon;
export const ChevronRight = Icon;
export const Clock = Icon;
export const CloudRain = Icon;
export const CloudSun = Icon;
export const Compass = Icon;
export const Crosshair = Icon;
export const DollarSign = Icon;
export const Download = Icon;
export const Droplets = Icon;
export const Edit = Icon;
export const ExternalLink = Icon;
export const Eye = Icon;
export const EyeOff = Icon;
export const FileCheck = Icon;
export const FileEdit = Icon;
export const FileSpreadsheet = Icon;
export const FileText = Icon;
export const Flame = Icon;
export const Headphones = Icon;
export const History = Icon;
export const Hospital = Icon;
export const Landmark = Icon;
export const MapPin = Icon;
export const Mountain = Icon;
export const Phone = Icon;
export const PhoneCall = Icon;
export const Plus = Icon;
export const Radio = Icon;
export const RefreshCw = Icon;
export const RotateCcw = Icon;
export const Route = Icon;
export const Search = Icon;
export const Send = Icon;
export const ShieldCheck = Icon;
export const Sparkles = Icon;
export const Tent = Icon;
export const Ticket = Icon;
export const Trash2 = Icon;
export const Trees = Icon;
export const Users = Icon;
export const Waves = Icon;
export const XCircle = Icon;
