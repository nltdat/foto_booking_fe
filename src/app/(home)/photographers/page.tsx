"use client";

/* eslint-disable @next/next/no-img-element */

export const dynamic = "force-dynamic";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Camera,
  ChevronLeft,
  ChevronRight,
  Filter,
  Heart,
  Loader2,
  MapPin,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  UserRound,
  X
} from "lucide-react";
import { manrope } from "../../fonts";
import CustomerHeader from "../../components/header";
import {
  favoritePhotographer,
  getPhotographers,
  unfavoritePhotographer
} from "@/services/photographer.service";
import { useAuthStore } from "@/store/auth-store";
import type { PaginatedPhotographersResponse, Photographer } from "@/types/photographer";

type FilterState = {
  shooting_location: string;
  experience_in_year: string;
  gender: string;
  languages: string[];
  work_model: string[];
  work_packages: string[];
};

type SortOption = {
  label: string;
  value: string;
  sortBy?: string;
  direction?: "asc" | "desc";
};

type QueryParams = {
  get: (name: string) => string | null;
  toString: () => string;
};

const PAGE_SIZE = 12;
const FALLBACK_IMAGES = [
  "/customer-home/bg.png",
  "/customer-home/bg-2.png",
  "/customer-home/bg-3.png",
  "/customer-home/welcome-to-potonow.jpg",
  "/customer-home/welcome-to-potonow-2.jpg"
] as const;

const defaultFilters: FilterState = {
  shooting_location: "",
  experience_in_year: "",
  gender: "",
  languages: [],
  work_model: [],
  work_packages: []
};

const experienceOptions = [
  { label: "Tất cả", value: "" },
  { label: "Dưới 1 năm", value: "0_1" },
  { label: "Từ 1-3 năm", value: "1_3" },
  { label: "Từ 3-5 năm", value: "3_5" },
  { label: "Trên 5 năm", value: "5_plus" }
] as const;

const genderOptions = [
  { label: "Tất cả", value: "" },
  { label: "Nam", value: "male" },
  { label: "Nữ", value: "female" },
  { label: "Khác", value: "other" }
] as const;

const languageOptions = [
  { label: "Tiếng Việt", value: "vi" },
  { label: "English", value: "en" },
  { label: "日本語", value: "ja" },
  { label: "한국어", value: "ko" }
] as const;

const workModelOptions = [
  { label: "Studio", value: "studio" },
  { label: "Ngoài trời", value: "outdoor" },
  { label: "Trong nhà", value: "indoor" }
] as const;

const packageOptions = [
  { label: "Cá nhân", value: "PERSONAL" },
  { label: "Cặp đôi", value: "COUPLE" },
  { label: "Sự kiện", value: "EVENT" },
  { label: "Cưới", value: "WEDDING" },
  { label: "Gia đình", value: "FAMILY" }
] as const;

const sortOptions: SortOption[] = [
  { label: "Hồ sơ mới nhất", value: "newest" },
  { label: "Buổi chụp nhiều nhất", value: "shooting_desc", sortBy: "shooting_count", direction: "desc" },
  { label: "Buổi chụp ít nhất", value: "shooting_asc", sortBy: "shooting_count", direction: "asc" },
  { label: "Yêu thích nhiều nhất", value: "favorite_desc", sortBy: "favorite_count", direction: "desc" },
  { label: "Đánh giá cao nhất", value: "rating_desc", sortBy: "rating", direction: "desc" },
  { label: "Đánh giá thấp nhất", value: "rating_asc", sortBy: "rating", direction: "asc" }
];

function csv(value: string | null): string[] {
  return value ? value.split(",").map((item) => item.trim()).filter(Boolean) : [];
}

function getFilters(params: QueryParams): FilterState {
  return {
    shooting_location: params.get("shooting_location") ?? "",
    experience_in_year: params.get("experience_in_year") ?? "",
    gender: params.get("gender") ?? "",
    languages: csv(params.get("languages")),
    work_model: csv(params.get("work_model")),
    work_packages: csv(params.get("work_packages"))
  };
}

function getSortValue(params: QueryParams): string {
  const sortBy = params.get("sortBy");
  const direction = params.get("direction");
  const match = sortOptions.find((option) => option.sortBy === sortBy && option.direction === direction);
  return match?.value ?? "newest";
}

function joinLocation(photographer: Photographer): string {
  if (photographer.active_locations.length > 0) {
    return photographer.active_locations
      .map((location) => location.city_province)
      .filter(Boolean)
      .filter((location, index, values) => values.indexOf(location) === index)
      .join(" · ");
  }

  return photographer.city || "Chưa cập nhật";
}

function experienceLabel(years: number): string {
  if (years < 1) return "Dưới 1 năm";
  if (years <= 3) return "Từ 1-3 năm";
  if (years <= 5) return "Từ 3-5 năm";
  return "Trên 5 năm";
}

function initials(name: string): string {
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function gallerySources(photographer: Photographer): string[] {
  const sources = photographer.gallery_preview
    .map((image) => image.src)
    .filter((src): src is string => Boolean(src));

  if (sources.length > 0) {
    return sources.slice(0, 5);
  }

  return [...FALLBACK_IMAGES];
}

function formatRating(value: string): string {
  const rating = Number(value);
  return Number.isFinite(rating) ? rating.toFixed(1) : "0.0";
}

function pageItems(currentPage: number, totalPages: number): Array<number | "..."> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages: Array<number | "..."> = [1];
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  if (start > 2) pages.push("...");
  for (let page = start; page <= end; page += 1) pages.push(page);
  if (end < totalPages - 1) pages.push("...");
  pages.push(totalPages);
  return pages;
}

function toggleArrayValue(values: string[], value: string): string[] {
  return values.includes(value)
    ? values.filter((current) => current !== value)
    : [...values, value];
}

function updatePhotographer(
  data: PaginatedPhotographersResponse | null,
  photographerId: number,
  updater: (photographer: Photographer) => Photographer
): PaginatedPhotographersResponse | null {
  if (!data) return data;

  return {
    ...data,
    results: data.results.map((photographer) =>
      photographer.id === photographerId ? updater(photographer) : photographer
    )
  };
}

function PhotographerSkeleton() {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-[#eadfce] bg-white">
      <div className="aspect-square animate-pulse bg-[#eadfce]" />
      <div className="space-y-4 p-4">
        <div className="h-5 w-2/3 animate-pulse rounded bg-[#eadfce]" />
        <div className="h-4 w-full animate-pulse rounded bg-[#f0e6d8]" />
        <div className="h-4 w-4/5 animate-pulse rounded bg-[#f0e6d8]" />
      </div>
    </div>
  );
}

export default function CustomerPhotographersPage() {
  return (
    <Suspense fallback={<PhotographersPageFallback />}>
      <PhotographersClientPage />
    </Suspense>
  );
}

function PhotographersPageFallback() {
  return (
    <main className={`${manrope.className} min-h-screen bg-[#fcf8f2] text-[#23180f]`}>
      <CustomerHeader />
      <section className="mx-auto w-full max-w-[75rem] px-4 pb-12 pt-10 sm:px-6 lg:px-8">
        <div className="h-12 w-72 animate-pulse rounded bg-[#eadfce]" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => (
            <PhotographerSkeleton key={index} />
          ))}
        </div>
      </section>
    </main>
  );
}

function PhotographersClientPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryKey = searchParams.toString();
  const [data, setData] = useState<PaginatedPhotographersResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [keyword, setKeyword] = useState(searchParams.get("keyword") ?? "");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [draftFilters, setDraftFilters] = useState<FilterState>(() => getFilters(searchParams));
  const [selectedPhotographer, setSelectedPhotographer] = useState<Photographer | null>(null);
  const [favoriteError, setFavoriteError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  const currentPage = Number(searchParams.get("page") ?? "1") || 1;
  const totalPages = data ? Math.max(1, Math.ceil(data.count / PAGE_SIZE)) : 1;
  const filters = useMemo(() => getFilters(searchParams), [searchParams]);
  const activeFilterCount = [
    filters.shooting_location,
    filters.experience_in_year,
    filters.gender,
    ...filters.languages,
    ...filters.work_model,
    ...filters.work_packages
  ].filter(Boolean).length;

  const pushQuery = useCallback(
    (updates: Record<string, string | null>, resetPage = true) => {
      const next = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          next.set(key, value);
        } else {
          next.delete(key);
        }
      });

      if (resetPage) {
        next.delete("page");
      }

      const nextQuery = next.toString();
      router.push(nextQuery ? `/photographers?${nextQuery}` : "/photographers");
    },
    [router, searchParams]
  );

  useEffect(() => {
    setKeyword(searchParams.get("keyword") ?? "");
    setDraftFilters(getFilters(searchParams));
  }, [queryKey, searchParams]);

  useEffect(() => {
    let isActive = true;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page_size", String(PAGE_SIZE));

    setIsLoading(true);
    setErrorMessage(null);

    getPhotographers(params)
      .then((nextData) => {
        if (isActive) {
          setData(nextData);
        }
      })
      .catch(() => {
        if (isActive) {
          setErrorMessage("Không thể tải danh sách nhiếp ảnh gia.");
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [queryKey, reloadKey, searchParams]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    pushQuery({ keyword: keyword.trim() || null });
  }

  function applyFilters() {
    pushQuery({
      shooting_location: draftFilters.shooting_location.trim() || null,
      experience_in_year: draftFilters.experience_in_year || null,
      gender: draftFilters.gender || null,
      languages: draftFilters.languages.join(",") || null,
      work_model: draftFilters.work_model.join(",") || null,
      work_packages: draftFilters.work_packages.join(",") || null
    });
    setIsFilterOpen(false);
  }

  function clearFilters() {
    setIsFilterOpen(false);
    router.push("/photographers");
  }

  function onSortChange(value: string) {
    const option = sortOptions.find((item) => item.value === value) ?? sortOptions[0];
    pushQuery({
      sortBy: option.sortBy ?? null,
      direction: option.direction ?? null
    });
  }

  function goToPage(page: number) {
    pushQuery({ page: page > 1 ? String(page) : null }, false);
  }

  async function toggleFavorite(photographer: Photographer) {
    if (!isHydrated) return;

    if (!isAuthenticated) {
      router.push("/sign-in");
      return;
    }

    if (user?.role !== "CUSTOMER") {
      return;
    }

    const nextFavored = !photographer.favored;
    setFavoriteError(null);
    setData((current) =>
      updatePhotographer(current, photographer.id, (item) => ({
        ...item,
        favored: nextFavored,
        favorite_count: Math.max(0, item.favorite_count + (nextFavored ? 1 : -1))
      }))
    );

    try {
      const response = nextFavored
        ? await favoritePhotographer(photographer.id)
        : await unfavoritePhotographer(photographer.id);
      setData((current) =>
        updatePhotographer(current, photographer.id, (item) => ({
          ...item,
          favored: response.favored,
          favorite_count: response.favorite_count
        }))
      );
    } catch {
      setFavoriteError("Không thể cập nhật yêu thích. Vui lòng thử lại.");
      setData((current) =>
        updatePhotographer(current, photographer.id, (item) => ({
          ...item,
          favored: photographer.favored,
          favorite_count: photographer.favorite_count
        }))
      );
    }
  }

  const showFavoriteAction = !isHydrated || !isAuthenticated || user?.role === "CUSTOMER";

  return (
    <main className={`${manrope.className} min-h-screen bg-[#fcf8f2] text-[#23180f]`}>
      <CustomerHeader />

      <section className="mx-auto w-full max-w-[75rem] px-4 pb-12 pt-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#f5c891] bg-white px-3 py-1 text-[0.78rem] font-bold uppercase text-[#b85f16]">
              <Sparkles className="h-4 w-4" />
              Potonow photographers
            </p>
            <h1 className="text-[2.1rem] font-extrabold leading-tight text-[#222631] sm:text-[2.7rem]">
              Nhiếp ảnh gia
            </h1>
            <p className="mt-3 text-[1rem] leading-7 text-[#5d6472]">
              Khám phá hồ sơ, portfolio và tín hiệu chất lượng để chọn người phù hợp cho buổi chụp tiếp theo.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <form
              onSubmit={submitSearch}
              className="flex h-12 min-w-0 overflow-hidden rounded-[0.9rem] border border-[#e5d8c7] bg-white shadow-[0_12px_30px_rgba(89,61,44,0.06)] md:w-[22rem]"
            >
              <input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="Tìm tên, phong cách, chuyên môn"
                className="min-w-0 flex-1 bg-transparent px-4 text-[0.95rem] outline-none"
              />
              <button
                type="submit"
                aria-label="Tìm kiếm"
                className="grid w-12 place-items-center text-[#f47c20] transition hover:bg-[#fff4e8]"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsFilterOpen(true)}
                className="inline-flex h-12 min-w-[8rem] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[0.9rem] border border-[#e5d8c7] bg-white px-5 font-bold text-[#222631] shadow-[0_12px_30px_rgba(89,61,44,0.06)] transition hover:border-[#f47c20]"
              >
                <Filter className="h-5 w-5 text-[#f47c20]" />
                Bộ lọc
                {activeFilterCount > 0 ? (
                  <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#f47c20] px-1.5 text-[0.72rem] text-white">
                    {activeFilterCount}
                  </span>
                ) : null}
              </button>

              <label className="relative h-12 rounded-[0.9rem] border border-[#e5d8c7] bg-white shadow-[0_12px_30px_rgba(89,61,44,0.06)]">
                <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#f47c20]" />
                <select
                  value={getSortValue(searchParams)}
                  onChange={(event) => onSortChange(event.target.value)}
                  className="h-full appearance-none rounded-[0.9rem] bg-transparent pl-10 pr-9 text-[0.92rem] font-bold text-[#222631] outline-none"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </div>

        {favoriteError ? (
          <div className="mt-5 rounded-[0.9rem] border border-[#ffd4c4] bg-[#fff3ee] px-4 py-3 text-[0.92rem] font-semibold text-[#b6532b]">
            {favoriteError}
          </div>
        ) : null}

        <div className="mt-8">
          {errorMessage ? (
            <div className="grid min-h-[18rem] place-items-center rounded-[1.4rem] border border-[#eadfce] bg-white px-6 text-center">
              <div>
                <p className="text-lg font-extrabold text-[#222631]">{errorMessage}</p>
                <button
                  type="button"
                  onClick={() => setReloadKey((current) => current + 1)}
                  className="mt-5 inline-flex h-11 items-center gap-2 rounded-[0.9rem] bg-[#f47c20] px-5 font-bold text-white"
                >
                  <RotateCcw className="h-4 w-4" />
                  Thử lại
                </button>
              </div>
            </div>
          ) : isLoading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }, (_, index) => (
                <PhotographerSkeleton key={index} />
              ))}
            </div>
          ) : data && data.results.length > 0 ? (
            <>
              <div className="mb-4 flex items-center justify-between gap-4 text-[0.95rem] text-[#6d7280]">
                <span>
                  {data.count} nhiếp ảnh gia phù hợp
                </span>
                {activeFilterCount > 0 || searchParams.get("keyword") ? (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex items-center gap-2 font-bold text-[#f47c20]"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Xóa lọc
                  </button>
                ) : null}
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data.results.map((photographer) => (
                  <PhotographerCard
                    key={photographer.id}
                    photographer={photographer}
                    showFavoriteAction={showFavoriteAction}
                    onToggleFavorite={toggleFavorite}
                    onOpenProfile={setSelectedPhotographer}
                  />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
              />
            </>
          ) : (
            <div className="grid min-h-[20rem] place-items-center rounded-[1.4rem] border border-[#eadfce] bg-white px-6 text-center">
              <div className="max-w-md">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#fff1df] text-[#f47c20]">
                  <Search className="h-7 w-7" />
                </div>
                <p className="mt-4 text-lg font-extrabold text-[#222631]">
                  Chưa có nhiếp ảnh gia phù hợp
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 inline-flex h-11 items-center gap-2 rounded-[0.9rem] bg-[#f47c20] px-5 font-bold text-white"
                >
                  <RotateCcw className="h-4 w-4" />
                  Xóa lọc
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {isFilterOpen ? (
        <FilterDrawer
          value={draftFilters}
          onChange={setDraftFilters}
          onClose={() => setIsFilterOpen(false)}
          onApply={applyFilters}
          onClear={clearFilters}
        />
      ) : null}

      {selectedPhotographer ? (
        <ProfileModal
          photographer={selectedPhotographer}
          onClose={() => setSelectedPhotographer(null)}
        />
      ) : null}
    </main>
  );
}

function PhotographerCard({
  photographer,
  showFavoriteAction,
  onToggleFavorite,
  onOpenProfile
}: {
  photographer: Photographer;
  showFavoriteAction: boolean;
  onToggleFavorite: (photographer: Photographer) => void;
  onOpenProfile: (photographer: Photographer) => void;
}) {
  const images = gallerySources(photographer);
  const primaryImage = images[0];

  return (
    <article className="overflow-hidden rounded-[1.5rem] border border-[#eadfce] bg-white shadow-[0_18px_45px_rgba(89,61,44,0.08)]">
      <div className="relative aspect-square bg-[#eadfce]">
        <img
          src={primaryImage}
          alt={photographer.display_name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-x-3 bottom-3 grid grid-cols-4 gap-2">
          {images.slice(1, 5).map((image, index) => (
            <img
              key={`${image}-${index}`}
              src={image}
              alt=""
              className="h-12 rounded-[0.55rem] border border-white/80 object-cover shadow"
            />
          ))}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start gap-3">
          {photographer.avatar_url ? (
            <img
              src={photographer.avatar_url}
              alt={photographer.display_name}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <span className="grid h-12 w-12 place-items-center rounded-full bg-[#ffe0a3] text-sm font-extrabold text-[#21405b]">
              {initials(photographer.display_name)}
            </span>
          )}

          <div className="min-w-0 flex-1">
            <h2 className="truncate text-[1.02rem] font-extrabold text-[#222631]">
              {photographer.display_name}
            </h2>
            <p className="mt-1 flex items-center gap-1 truncate text-[0.82rem] text-[#6d7280]">
              <MapPin className="h-3.5 w-3.5 flex-none text-[#f47c20]" />
              {joinLocation(photographer)}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[0.78rem]">
          <StatBadge icon={Star} value={formatRating(photographer.rating_avg)} label={`${photographer.total_reviews} đánh giá`} />
          <StatBadge icon={Camera} value={String(photographer.shooting_count)} label="buổi chụp" />
          <StatBadge icon={Heart} value={String(photographer.favorite_count)} label="yêu thích" />
        </div>

        <p className="mt-4 line-clamp-3 min-h-[4.2rem] text-[0.9rem] leading-6 text-[#525866]">
          {photographer.bio || photographer.specialties || "Nhiếp ảnh gia đang cập nhật hồ sơ."}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-[#eef5f2] px-3 py-1 text-[0.78rem] font-bold text-[#26705b]">
            {experienceLabel(photographer.experience_years)}
          </span>
          {photographer.working_packages.slice(0, 2).map((item) => (
            <span
              key={item}
              className="rounded-full bg-[#fff1df] px-3 py-1 text-[0.78rem] font-bold text-[#b85f16]"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-5 flex gap-2">
          {showFavoriteAction ? (
            <button
              type="button"
              onClick={() => onToggleFavorite(photographer)}
              aria-label={photographer.favored ? "Bỏ yêu thích" : "Yêu thích"}
              aria-pressed={photographer.favored}
              className={`grid h-11 w-11 flex-none place-items-center rounded-[0.9rem] border transition ${
                photographer.favored
                  ? "border-[#f47c20] bg-[#fff1df] text-[#f47c20]"
                  : "border-[#e5d8c7] text-[#6d7280] hover:border-[#f47c20] hover:text-[#f47c20]"
              }`}
            >
              <Heart className="h-5 w-5" fill={photographer.favored ? "currentColor" : "none"} />
            </button>
          ) : null}

          <button
            type="button"
            onClick={() => onOpenProfile(photographer)}
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-[0.9rem] bg-[#f47c20] px-4 text-[0.9rem] font-extrabold text-white transition hover:bg-[#df6f1d]"
          >
            Xem và đặt lịch
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

function StatBadge({
  icon: Icon,
  value,
  label
}: {
  icon: typeof Star;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-[0.8rem] bg-[#f8f4ed] px-2 py-2">
      <div className="flex items-center justify-center gap-1 font-extrabold text-[#222631]">
        <Icon className="h-3.5 w-3.5 text-[#f47c20]" />
        {value}
      </div>
      <div className="mt-0.5 truncate text-[#7a7f8c]">{label}</div>
    </div>
  );
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Phân trang">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Trang trước"
        className="grid h-10 w-10 place-items-center rounded-[0.8rem] border border-[#e5d8c7] bg-white text-[#222631] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      {pageItems(currentPage, totalPages).map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="px-2 text-[#8b8f99]">
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`h-10 min-w-10 rounded-[0.8rem] border px-3 font-bold ${
              page === currentPage
                ? "border-[#f47c20] bg-[#f47c20] text-white"
                : "border-[#e5d8c7] bg-white text-[#222631]"
            }`}
          >
            {page}
          </button>
        )
      )}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Trang sau"
        className="grid h-10 w-10 place-items-center rounded-[0.8rem] border border-[#e5d8c7] bg-white text-[#222631] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </nav>
  );
}

function FilterDrawer({
  value,
  onChange,
  onClose,
  onApply,
  onClear
}: {
  value: FilterState;
  onChange: (value: FilterState) => void;
  onClose: () => void;
  onApply: () => void;
  onClear: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/35">
      <aside className="ml-auto flex h-full w-full max-w-[27rem] flex-col bg-white shadow-[-20px_0_60px_rgba(0,0,0,0.18)]">
        <div className="flex items-center justify-between border-b border-[#eee2d3] px-5 py-4">
          <h2 className="text-lg font-extrabold text-[#222631]">Bộ lọc</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng bộ lọc"
            className="grid h-10 w-10 place-items-center rounded-full text-[#222631] hover:bg-[#f8f4ed]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
          <FieldBlock label="Địa điểm">
            <input
              value={value.shooting_location}
              onChange={(event) => onChange({ ...value, shooting_location: event.target.value })}
              placeholder="Ha Noi, TP. Ho Chi Minh..."
              className="h-11 w-full rounded-[0.8rem] border border-[#e5d8c7] px-3 outline-none focus:border-[#f47c20]"
            />
          </FieldBlock>

          <FieldBlock label="Số năm kinh nghiệm">
            <SegmentedOptions
              options={experienceOptions}
              value={value.experience_in_year}
              onChange={(nextValue) => onChange({ ...value, experience_in_year: nextValue })}
            />
          </FieldBlock>

          <FieldBlock label="Giới tính">
            <SegmentedOptions
              options={genderOptions}
              value={value.gender}
              onChange={(nextValue) => onChange({ ...value, gender: nextValue })}
            />
          </FieldBlock>

          <FieldBlock label="Ngôn ngữ">
            <CheckboxOptions
              options={languageOptions}
              values={value.languages}
              onChange={(nextValue) => onChange({ ...value, languages: nextValue })}
            />
          </FieldBlock>

          <FieldBlock label="Hình thức làm việc">
            <CheckboxOptions
              options={workModelOptions}
              values={value.work_model}
              onChange={(nextValue) => onChange({ ...value, work_model: nextValue })}
            />
          </FieldBlock>

          <FieldBlock label="Gói chụp">
            <CheckboxOptions
              options={packageOptions}
              values={value.work_packages}
              onChange={(nextValue) => onChange({ ...value, work_packages: nextValue })}
            />
          </FieldBlock>
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-[#eee2d3] p-5">
          <button
            type="button"
            onClick={onClear}
            className="h-11 rounded-[0.9rem] border border-[#e5d8c7] font-extrabold text-[#222631]"
          >
            Xóa lọc
          </button>
          <button
            type="button"
            onClick={onApply}
            className="h-11 rounded-[0.9rem] bg-[#f47c20] font-extrabold text-white"
          >
            Áp dụng
          </button>
        </div>
      </aside>
    </div>
  );
}

function FieldBlock({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section>
      <h3 className="mb-3 text-[0.92rem] font-extrabold text-[#222631]">{label}</h3>
      {children}
    </section>
  );
}

function SegmentedOptions({
  options,
  value,
  onChange
}: {
  options: ReadonlyArray<{ label: string; value: string }>;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map((option) => (
        <button
          key={option.value || "all"}
          type="button"
          onClick={() => onChange(option.value)}
          className={`min-h-10 rounded-[0.8rem] border px-3 text-[0.88rem] font-bold ${
            value === option.value
              ? "border-[#f47c20] bg-[#fff1df] text-[#b85f16]"
              : "border-[#e5d8c7] text-[#4f5664]"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function CheckboxOptions({
  options,
  values,
  onChange
}: {
  options: ReadonlyArray<{ label: string; value: string }>;
  values: string[];
  onChange: (value: string[]) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map((option) => {
        const checked = values.includes(option.value);
        return (
          <label
            key={option.value}
            className={`flex min-h-10 cursor-pointer items-center gap-2 rounded-[0.8rem] border px-3 text-[0.88rem] font-bold ${
              checked
                ? "border-[#f47c20] bg-[#fff1df] text-[#b85f16]"
                : "border-[#e5d8c7] text-[#4f5664]"
            }`}
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={() => onChange(toggleArrayValue(values, option.value))}
              className="h-4 w-4 accent-[#f47c20]"
            />
            {option.label}
          </label>
        );
      })}
    </div>
  );
}

function ProfileModal({
  photographer,
  onClose
}: {
  photographer: Photographer;
  onClose: () => void;
}) {
  const images = gallerySources(photographer);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 px-4 py-6">
      <section className="max-h-full w-full max-w-3xl overflow-y-auto rounded-[1.5rem] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.24)]">
        <div className="relative h-64 bg-[#eadfce]">
          <img
            src={images[0]}
            alt={photographer.display_name}
            className="h-full w-full object-cover"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng hồ sơ"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-[#222631]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            {photographer.avatar_url ? (
              <img
                src={photographer.avatar_url}
                alt={photographer.display_name}
                className="h-20 w-20 rounded-full object-cover"
              />
            ) : (
              <span className="grid h-20 w-20 place-items-center rounded-full bg-[#ffe0a3] text-xl font-extrabold text-[#21405b]">
                {initials(photographer.display_name)}
              </span>
            )}
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-extrabold text-[#222631]">
                {photographer.display_name}
              </h2>
              <p className="mt-2 flex items-center gap-2 text-[#6d7280]">
                <MapPin className="h-4 w-4 text-[#f47c20]" />
                {joinLocation(photographer)}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-4">
            <StatBadge icon={Star} value={formatRating(photographer.rating_avg)} label={`${photographer.total_reviews} đánh giá`} />
            <StatBadge icon={Camera} value={String(photographer.shooting_count)} label="buổi chụp" />
            <StatBadge icon={Heart} value={String(photographer.favorite_count)} label="yêu thích" />
            <StatBadge icon={UserRound} value={experienceLabel(photographer.experience_years)} label="kinh nghiệm" />
          </div>

          <p className="mt-6 whitespace-pre-line text-[0.98rem] leading-7 text-[#4f5664]">
            {photographer.bio || "Nhiếp ảnh gia đang cập nhật phần giới thiệu."}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {images.slice(0, 5).map((image, index) => (
              <img
                key={`${image}-${index}`}
                src={image}
                alt=""
                className="aspect-square rounded-[0.9rem] object-cover"
              />
            ))}
          </div>

          <button
            type="button"
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[0.9rem] bg-[#f47c20] font-extrabold text-white"
          >
            Xem và đặt lịch
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
