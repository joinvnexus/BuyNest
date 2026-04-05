export default function ProductLoading() {
  return (
    <div className="min-h-screen pb-20">
      <section className="border-b border-border/60 bg-muted/30">
        <div className="container px-4 py-12 sm:px-6 lg:px-8">
          <div className="h-5 w-64 animate-pulse rounded-full bg-muted" />
        </div>
      </section>

      <div className="container px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,460px)]">
          <div className="space-y-8">
            <div className="aspect-[1/1.05] animate-pulse rounded-[2rem] bg-muted" />
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
              {Array.from({ length: 5 }, (_, index) => (
                <div key={index} className="aspect-square animate-pulse rounded-2xl bg-muted" />
              ))}
            </div>
            <div className="rounded-[2rem] border border-border/60 bg-card/80 p-6 shadow-sm">
              <div className="space-y-4">
                <div className="h-6 w-40 animate-pulse rounded-full bg-muted" />
                <div className="h-12 w-2/3 animate-pulse rounded-3xl bg-muted" />
                <div className="h-5 w-full animate-pulse rounded-3xl bg-muted" />
                <div className="h-5 w-3/4 animate-pulse rounded-3xl bg-muted" />
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border/60 bg-card p-6 shadow-sm sm:p-8">
            <div className="space-y-4">
              <div className="h-6 w-32 animate-pulse rounded-full bg-muted" />
              <div className="h-12 w-40 animate-pulse rounded-3xl bg-muted" />
              <div className="h-28 animate-pulse rounded-[1.5rem] bg-muted" />
              <div className="h-12 w-full animate-pulse rounded-full bg-muted" />
              <div className="h-12 w-full animate-pulse rounded-full bg-muted" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
