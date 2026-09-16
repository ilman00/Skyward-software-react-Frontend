import React, { useEffect, useState, type FormEvent } from "react";
import {
  User,
  Briefcase,
  Save,
  Loader2,
  Camera,
  FileText,
  Eye,
  EyeOff,
} from "lucide-react";
import RichTextEditor from "./RichTextEditor";
import type { EmployeeDetail, EmployeeFormValues } from "../../services/EmployeeAPIs";

/**
 * Mirrors the backend's slug format rules for live client-side suggestion.
 * Final uniqueness/format validation still happens server-side.
 */
const slugify = (input: string): string =>
  input
    .toLowerCase()
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/* ------------------ TYPES ------------------ */

interface Props {
  onSubmit: (data: EmployeeFormValues) => Promise<void>;
  initialData: EmployeeDetail | null;
  isEditMode: boolean;
}

const inputClass =
  "w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-gray-700 disabled:bg-gray-50 disabled:text-gray-400";

/* ------------------ COMPONENT ------------------ */

const EmployeeForm: React.FC<Props> = ({ onSubmit, initialData, isEditMode }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [fullName, setFullName] = useState("");
  const [designation, setDesignation] = useState("");
  const [slug, setSlug] = useState("");
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [content, setContent] = useState("");
  const [generalInformation, setGeneralInformation] = useState("");
  const [employmentDetails, setEmploymentDetails] = useState("");
  const [keyResponsibilities, setKeyResponsibilities] = useState("");

  const handleFullNameChange = (value: string) => {
    setFullName(value);
    if (!isSlugManuallyEdited) {
      setSlug(slugify(value));
    }
  };

  const handleSlugChange = (value: string) => {
    setIsSlugManuallyEdited(true);
    setSlug(slugify(value));
  };

  // Populate form when editing an existing employee
  useEffect(() => {
    if (!initialData) return;

    setFullName(initialData.full_name);
    setDesignation(initialData.designation);
    setSlug(initialData.slug);
    setIsSlugManuallyEdited(true); // never auto-overwrite an existing slug
    setIsVisible(initialData.status !== "hidden");
    setPhotoPreview(initialData.photo_url);

    setContent(initialData.content ?? "");
    setGeneralInformation(initialData.general_information ?? "");
    setEmploymentDetails(initialData.employment_details ?? "");
    setKeyResponsibilities(initialData.key_responsibilities ?? "");
  }, [initialData]);

  // Revoke the object URL for locally-selected photos on unmount/replacement
  useEffect(() => {
    return () => {
      if (photoFile && photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photoPreview]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      return;
    }

    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit({
        full_name: fullName,
        designation,
        content,
        general_information: generalInformation,
        employment_details: employmentDetails,
        key_responsibilities: keyResponsibilities,
        status: isVisible ? "active" : "hidden",
        slug,
        photo: photoFile,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditMode ? "Edit Employee" : "Add Employee"}
          </h1>
          <p className="text-sm text-gray-500">
            {isEditMode
              ? "Update this employee's profile"
              : "Create a new employee profile for the team directory"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Details Card */}
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Section Header */}
            <div className="px-8 py-5 bg-gray-50/50 border-b border-gray-200 flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User size={20} className="text-blue-700" />
              </div>
              <h2 className="text-lg font-bold text-gray-800">Profile Details</h2>
            </div>

            <div className="p-8 space-y-8">
              {/* Photo */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Photo
                </label>

                <div className="flex items-center gap-5">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={32} className="text-gray-300" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-700 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
                      <Camera size={16} />
                      {photoPreview ? "Change photo" : "Upload photo"}
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />
                    </label>
                    <p className="text-xs text-gray-400">
                      JPEG, PNG or WebP, up to 5MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Name + Designation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700 ml-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3.5 flex items-center text-gray-400">
                      <User size={18} />
                    </span>
                    <input
                      type="text"
                      placeholder="e.g. Ilman Khan"
                      value={fullName}
                      onChange={(e) => handleFullNameChange(e.target.value)}
                      className={`${inputClass} pl-11`}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700 ml-1">
                    Designation *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3.5 flex items-center text-gray-400">
                      <Briefcase size={18} />
                    </span>
                    <input
                      type="text"
                      placeholder="e.g. Operations Manager"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      className={`${inputClass} pl-11`}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Slug */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Public URL Slug *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3.5 flex items-center text-gray-400 text-sm">
                    /our-team/
                  </span>
                  <input
                    type="text"
                    placeholder="john-doe"
                    value={slug}
                    onChange={(e) => handleSlugChange(e.target.value)}
                    className={`${inputClass} pl-24 font-mono text-sm`}
                    required
                  />
                </div>
                <p className="text-xs text-gray-400 ml-1">
                  {isEditMode
                    ? "Changing this will break any QR codes or links already printed with the current slug."
                    : "This becomes the employee's permanent profile URL — choose carefully, it won't change automatically later."}
                </p>
              </div>

              {/* About editor */}
              <RichTextEditor label="About" value={content} onChange={setContent} />

              {/* Visibility toggle */}
              <div className="flex items-center justify-between px-4 py-3 bg-gray-50/50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  {isVisible ? (
                    <Eye size={18} className="text-green-600" />
                  ) : (
                    <EyeOff size={18} className="text-gray-400" />
                  )}
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      {isVisible ? "Visible on website" : "Hidden from website"}
                    </p>
                    <p className="text-xs text-gray-400">
                      Hidden profiles are kept but removed from the public team
                      directory
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsVisible((v) => !v)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    isVisible ? "bg-blue-700" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      isVisible ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Profile Sections Card */}
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-8 py-5 bg-gray-50/50 border-b border-gray-200 flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText size={20} className="text-blue-700" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">Profile Sections</h2>
                <p className="text-xs text-gray-500">
                  Optional — each section appears as its own block on the public
                  profile
                </p>
              </div>
            </div>

            <div className="p-8 space-y-8">
              <RichTextEditor
                label="General Information"
                hint="Background, education, or anything that doesn't fit the sections below"
                value={generalInformation}
                onChange={setGeneralInformation}
                minHeight="min-h-[140px]"
              />
              <RichTextEditor
                label="Employment Details"
                hint="Role history, department, tenure"
                value={employmentDetails}
                onChange={setEmploymentDetails}
                minHeight="min-h-[140px]"
              />
              <RichTextEditor
                label="Key Responsibilities"
                hint="A bulleted list usually reads best here"
                value={keyResponsibilities}
                onChange={setKeyResponsibilities}
                minHeight="min-h-[140px]"
              />
            </div>
          </section>

          {/* Buttons */}
          <div className="flex justify-end">
            <button
              disabled={!fullName || !designation || !slug || isSubmitting}
              className="flex items-center gap-2 px-8 py-2.5 text-sm font-semibold text-white bg-blue-700 rounded-xl hover:bg-blue-800 disabled:opacity-50 transition-all shadow-sm shadow-blue-200"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  {isEditMode ? "Update Employee" : "Save Employee"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;