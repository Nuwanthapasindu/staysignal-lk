/* Local stand-in for `lucide-react` (not installed). Aliased in vite.config.js.
   Real lucide path data for the icons this app uses, so buttons read correctly. */
import { forwardRef } from 'react';

// lucide 24x24 path fragments (stroke, no fill)
const P = {
  _dot: '<circle cx="12" cy="12" r="9"/>',
  Search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  Eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  EyeOff: '<path d="M9.9 4.2A9 9 0 0 1 12 4c7 0 10 8 10 8a13 13 0 0 1-1.7 2.7"/><path d="M6.6 6.6A13 13 0 0 0 2 12s3 8 10 8a9 9 0 0 0 5.4-1.7"/><path d="m2 2 20 20"/>',
  Edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4Z"/>',
  FileEdit: '<path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5"/><polyline points="14 2 14 8 20 8"/><path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z"/>',
  Trash2: '<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>',
  Plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  Check: '<path d="M20 6 9 17l-5-5"/>',
  CheckCircle2: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  CheckSquare: '<polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
  XCircle: '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>',
  AlertCircle: '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
  AlertTriangle: '<path d="m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/>',
  ChevronDown: '<path d="m6 9 6 6 6-6"/>',
  ChevronLeft: '<path d="m15 18-6-6 6-6"/>',
  ChevronRight: '<path d="m9 18 6-6-6-6"/>',
  ArrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  RefreshCw: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/>',
  RotateCcw: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
  History: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l3 2"/>',
  Download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
  Send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  Calendar: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18M8 2v4M16 2v4"/>',
  Clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  MapPin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  Crosshair: '<circle cx="12" cy="12" r="10"/><line x1="22" x2="18" y1="12" y2="12"/><line x1="6" x2="2" y1="12" y2="12"/><line x1="12" x2="12" y1="6" y2="2"/><line x1="12" x2="12" y1="22" y2="18"/>',
  Compass: '<circle cx="12" cy="12" r="10"/><polygon points="16.2 7.8 14.1 14.1 7.8 16.2 9.9 9.9 16.2 7.8"/>',
  Route: '<circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M9 19h5a4 4 0 0 0 0-8H8a4 4 0 0 1 0-8h5"/>',
  Phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"/>',
  PhoneCall: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"/><path d="M15 3a6 6 0 0 1 6 6"/>',
  Headphones: '<path d="M3 14v-3a9 9 0 0 1 18 0v3"/><path d="M21 16a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2Zm-18 0a2 2 0 0 0 2 2h1v-6H5a2 2 0 0 0-2 2Z"/>',
  Radio: '<path d="M4.9 19.1a10 10 0 0 1 0-14.2M7.8 16.2a6 6 0 0 1 0-8.4M16.2 7.8a6 6 0 0 1 0 8.4M19.1 4.9a10 10 0 0 1 0 14.2"/><circle cx="12" cy="12" r="2"/>',
  DollarSign: '<line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  Ticket: '<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v14"/>',
  Bookmark: '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z"/>',
  BookOpen: '<path d="M12 7v14M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3Z"/>',
  FileText: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v5h5M8 13h8M8 17h8M8 9h2"/>',
  FileCheck: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v5h5"/><path d="m9 15 2 2 4-4"/>',
  FileSpreadsheet: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v5h5M8 13h2M8 17h2M14 13h2M14 17h2"/>',
  Landmark: '<line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/>',
  Mountain: '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>',
  Trees: '<path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z"/><path d="M7 16v6M13 19v3M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5"/>',
  Waves: '<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
  Droplets: '<path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 4.24 7 2c-.29 2.24-1.14 3.14-2.29 4.07S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05Z"/><path d="M12.56 6.6A11 11 0 0 0 16 6c-.29 2.24-1.14 3.14-2.29 4.07S12 12.1 12 13.25c0 2.22 1.8 4.05 4 4.05s4-1.83 4-4.05c0-1.16-.57-2.26-1.71-3.19a10.7 10.7 0 0 1-1.73-1.46"/>',
  Flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.09-1-4.5-1-4.5s3 1 4.5 3.5c1.5 2.5 2 4 2 6a6 6 0 0 1-12 0c0-1.5.5-3 1.5-4.5A2.5 2.5 0 0 0 8.5 14.5Z"/>',
  CloudRain: '<path d="M4 14.9A7 7 0 1 1 15.7 8h1.8a4.5 4.5 0 0 1 0 9H8"/><path d="M8 19v2M12 19v3M16 19v2"/>',
  CloudSun: '<path d="M12 2v2M5.6 5.6l1.4 1.4M2 13h2M19 13h2M17 7l1.4-1.4M6.3 17.7A5 5 0 1 1 13 9h1.5a3.5 3.5 0 0 1 0 7Z"/>',
  Users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  Hospital: '<path d="M12 6v4M8 8h8M18 3v18M6 3v18M3 21h18M3 7h3M3 11h3M18 7h3M18 11h3"/>',
  Sparkles: '<path d="m12 3-1.9 5.8L4 10.6l6.1 1.8L12 18l1.9-5.6L20 10.6l-6.1-1.8Z"/>',
  Tent: '<path d="M3.5 21 14 3M20.5 21 10 3M15.5 21 12 15l-3.5 6M4 21h16"/>',
  ShieldCheck: '<path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V6l8-3 8 3Z"/><path d="m9 12 2 2 4-4"/>',
  CameraOff: '<path d="m2 2 20 20"/><path d="M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16"/><path d="M9.5 4h5L17 7h3a2 2 0 0 1 2 2v7.5"/><path d="M14.1 14.1a3 3 0 0 1-4.2-4.2"/>',
  ExternalLink: '<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
};

const makeIcon = (d) =>
  forwardRef(function Icon({ size = 16, color = 'currentColor', strokeWidth = 2, className, ...rest }, ref) {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: d }}
        {...rest}
      />
    );
  });

const Generic = makeIcon(P._dot);
export default Generic;

export const Search = makeIcon(P.Search);
export const Eye = makeIcon(P.Eye);
export const EyeOff = makeIcon(P.EyeOff);
export const Edit = makeIcon(P.Edit);
export const FileEdit = makeIcon(P.FileEdit);
export const Trash2 = makeIcon(P.Trash2);
export const Plus = makeIcon(P.Plus);
export const Check = makeIcon(P.Check);
export const CheckCircle2 = makeIcon(P.CheckCircle2);
export const CheckSquare = makeIcon(P.CheckSquare);
export const XCircle = makeIcon(P.XCircle);
export const AlertCircle = makeIcon(P.AlertCircle);
export const AlertTriangle = makeIcon(P.AlertTriangle);
export const ChevronDown = makeIcon(P.ChevronDown);
export const ChevronLeft = makeIcon(P.ChevronLeft);
export const ChevronRight = makeIcon(P.ChevronRight);
export const ArrowRight = makeIcon(P.ArrowRight);
export const RefreshCw = makeIcon(P.RefreshCw);
export const RotateCcw = makeIcon(P.RotateCcw);
export const History = makeIcon(P.History);
export const Download = makeIcon(P.Download);
export const Send = makeIcon(P.Send);
export const Calendar = makeIcon(P.Calendar);
export const Clock = makeIcon(P.Clock);
export const MapPin = makeIcon(P.MapPin);
export const Crosshair = makeIcon(P.Crosshair);
export const Compass = makeIcon(P.Compass);
export const Route = makeIcon(P.Route);
export const Phone = makeIcon(P.Phone);
export const PhoneCall = makeIcon(P.PhoneCall);
export const Headphones = makeIcon(P.Headphones);
export const Radio = makeIcon(P.Radio);
export const DollarSign = makeIcon(P.DollarSign);
export const Ticket = makeIcon(P.Ticket);
export const Bookmark = makeIcon(P.Bookmark);
export const BookOpen = makeIcon(P.BookOpen);
export const FileText = makeIcon(P.FileText);
export const FileCheck = makeIcon(P.FileCheck);
export const FileSpreadsheet = makeIcon(P.FileSpreadsheet);
export const Landmark = makeIcon(P.Landmark);
export const Mountain = makeIcon(P.Mountain);
export const Trees = makeIcon(P.Trees);
export const Waves = makeIcon(P.Waves);
export const Droplets = makeIcon(P.Droplets);
export const Flame = makeIcon(P.Flame);
export const CloudRain = makeIcon(P.CloudRain);
export const CloudSun = makeIcon(P.CloudSun);
export const Users = makeIcon(P.Users);
export const Hospital = makeIcon(P.Hospital);
export const Sparkles = makeIcon(P.Sparkles);
export const Tent = makeIcon(P.Tent);
export const ShieldCheck = makeIcon(P.ShieldCheck);
export const CameraOff = makeIcon(P.CameraOff);
export const ExternalLink = makeIcon(P.ExternalLink);
