import AppLayout from "@/components/layout/AppLayout"
import BookingHistory from "@/components/dashboard/BookingHistory"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import DashboardStats from "@/components/dashboard/DashboardStats"
import FavoriteCleaners from "@/components/dashboard/FavoriteCleaners"
import RecentActivity from "@/components/dashboard/RecentActivity"
import UpcomingBooking from "@/components/dashboard/UpcomingBookings"

function CustomerDashboard() {
  return (
    <AppLayout>
      <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          <DashboardHeader />
          <DashboardStats />
          <UpcomingBooking />
          <BookingHistory />
          <FavoriteCleaners />
          <RecentActivity />
        </div>
      </div>
    </AppLayout>
  )
}

export default CustomerDashboard
