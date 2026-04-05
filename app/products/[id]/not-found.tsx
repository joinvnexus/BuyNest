import { StatePanel } from "@/components/ui/state-panel";

export default function ProductNotFound() {
  return (
    <div className="flex min-h-screen items-center px-4 py-16">
      <StatePanel
        badge="Product unavailable"
        title="We couldn't find that product."
        description="The item may have been removed, renamed, or is no longer available in the catalog."
        actionHref="/products"
        actionLabel="Back to catalog"
      />
    </div>
  );
}
