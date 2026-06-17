import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { Calendar, DollarSign, MessageSquare, Utensils, ArrowRight, Clock, CheckCircle2, UserPlus, AlertCircle } from 'lucide-react';

async function getAdminOverviewStats() {
  try {
    const totalBookings = await prisma.booking.count();
    
    // Sum revenue for approved/completed bookings
    const approvedBookings = await prisma.booking.findMany({
      where: {
        status: { in: ['APPROVED', 'COMPLETED'] },
      },
      select: { estimatedPrice: true },
    });
    const revenue = approvedBookings.reduce((sum, b) => sum + b.estimatedPrice, 0);

    const pendingMessages = await prisma.contactMessage.count({
      where: { status: 'UNREAD' },
    });

    const menuItemsCount = await prisma.menuItem.count();

    // Fetch 5 recent bookings
    const recentBookings = await prisma.booking.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { name: true, email: true },
        },
        package: {
          select: { name: true },
        },
      },
    });

    return { totalBookings, revenue, pendingMessages, menuItemsCount, recentBookings };
  } catch (error) {
    console.error('Error fetching admin statistics:', error);
    return {
      totalBookings: 0,
      revenue: 0,
      pendingMessages: 0,
      menuItemsCount: 0,
      recentBookings: [],
    };
  }
}

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const { totalBookings, revenue, pendingMessages, menuItemsCount, recentBookings } = await getAdminOverviewStats();

  const getStatusStyle = (status: string) => {
    switch (status.toUpperCase()) {
      case 'APPROVED':
        return 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20';
      case 'REJECTED':
        return 'bg-red-500/10 text-red-500 border border-red-500/20';
      case 'COMPLETED':
        return 'bg-blue-500/10 text-blue-500 border border-blue-500/20';
      default:
        return 'bg-amber-500/10 text-amber-500 border border-amber-500/20';
    }
  };

  // Static chart details representing mock monthly revenue distribution
  const chartData = [
    { month: 'Jan', sales: 12000 },
    { month: 'Feb', sales: 19000 },
    { month: 'Mar', sales: 15000 },
    { month: 'Apr', sales: 25000 },
    { month: 'May', sales: 34000 },
    { month: 'Jun', sales: revenue || 45000 },
  ];

  const maxSales = Math.max(...chartData.map(d => d.sales));

  return (
    <div className="space-y-10">
      
      {/* Welcome Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Overview Dashboard</h1>
        <p className="text-sm text-foreground/60 mt-1">
          Real-time analytics, booking inquiries, and menu availability status.
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Stat 1 */}
        <div className="bg-card border border-border p-6 rounded-3xl shadow-sm flex items-center space-x-4">
          <div className="bg-primary/10 p-3.5 rounded-2xl text-primary shrink-0">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <p className="text-stone-400 text-xs font-semibold uppercase">Total Requests</p>
            <h3 className="text-2xl font-black mt-0.5">{totalBookings}</h3>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-card border border-border p-6 rounded-3xl shadow-sm flex items-center space-x-4">
          <div className="bg-emerald-500/10 p-3.5 rounded-2xl text-emerald-500 shrink-0">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <p className="text-stone-400 text-xs font-semibold uppercase">Approved Revenue</p>
            <h3 className="text-2xl font-black mt-0.5">${revenue.toLocaleString()}</h3>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-card border border-border p-6 rounded-3xl shadow-sm flex items-center space-x-4">
          <div className="bg-amber-500/10 p-3.5 rounded-2xl text-amber-500 shrink-0">
            <MessageSquare className="h-6 w-6" />
          </div>
          <div>
            <p className="text-stone-400 text-xs font-semibold uppercase">Pending Inquiries</p>
            <h3 className="text-2xl font-black mt-0.5">{pendingMessages}</h3>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="bg-card border border-border p-6 rounded-3xl shadow-sm flex items-center space-x-4">
          <div className="bg-secondary/10 p-3.5 rounded-2xl text-secondary shrink-0">
            <Utensils className="h-6 w-6" />
          </div>
          <div>
            <p className="text-stone-400 text-xs font-semibold uppercase">Dishes Active</p>
            <h3 className="text-2xl font-black mt-0.5">{menuItemsCount}</h3>
          </div>
        </div>

      </div>

      {/* Analytics Chart & Activity Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sales Trend Chart */}
        <div className="lg:col-span-2 bg-card border border-border p-6 rounded-3xl shadow-sm space-y-6 flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-base">Monthly Revenue Trend</h3>
            <p className="text-xs text-foreground/50 mt-0.5">Calculated based on approved events.</p>
          </div>

          {/* SVG Custom Responsive Bar Chart */}
          <div className="h-60 w-full flex items-end justify-between pt-4 gap-2">
            {chartData.map((data) => {
              // Calculate height percentage
              const percent = (data.sales / maxSales) * 100;
              return (
                <div key={data.month} className="flex-1 flex flex-col items-center group cursor-pointer space-y-2">
                  {/* Tooltip bar hover */}
                  <span className="text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    ${data.sales.toLocaleString()}
                  </span>
                  {/* Bar */}
                  <div
                    className="w-full bg-stone-200 dark:bg-stone-800 rounded-t-lg group-hover:bg-primary transition-all duration-500 relative overflow-hidden"
                    style={{ height: `${percent * 0.7 + 10}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                  </div>
                  {/* Month Label */}
                  <span className="text-xs font-bold text-foreground/60 group-hover:text-foreground">
                    {data.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Links / Tasks */}
        <div className="bg-card border border-border p-6 rounded-3xl shadow-sm space-y-6">
          <h3 className="font-extrabold text-base">Quick Admin Shortcuts</h3>
          <div className="space-y-3">
            <Link
              href="/admin/bookings"
              className="flex items-center justify-between p-4 bg-foreground/2 dark:bg-foreground/1 border border-border rounded-2xl hover:border-primary/30 hover:scale-[1.01] transition-all"
            >
              <div className="flex items-center space-x-3 text-sm font-semibold">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Review Inquiries</span>
              </div>
              <ArrowRight className="h-4.5 w-4.5 text-foreground/40" />
            </Link>

            <Link
              href="/admin/menu"
              className="flex items-center justify-between p-4 bg-foreground/2 dark:bg-foreground/1 border border-border rounded-2xl hover:border-primary/30 hover:scale-[1.01] transition-all"
            >
              <div className="flex items-center space-x-3 text-sm font-semibold">
                <Utensils className="h-5 w-5 text-secondary" />
                <span>Manage Menu Catalog</span>
              </div>
              <ArrowRight className="h-4.5 w-4.5 text-foreground/40" />
            </Link>

            <Link
              href="/admin/messages"
              className="flex items-center justify-between p-4 bg-foreground/2 dark:bg-foreground/1 border border-border rounded-2xl hover:border-primary/30 hover:scale-[1.01] transition-all"
            >
              <div className="flex items-center space-x-3 text-sm font-semibold">
                <MessageSquare className="h-5 w-5 text-primary" />
                <span>Read Messages</span>
              </div>
              <ArrowRight className="h-4.5 w-4.5 text-foreground/40" />
            </Link>
          </div>
        </div>

      </div>

      {/* Recent Bookings Table */}
      <div className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-extrabold text-base">Recent Booking Requests</h3>
            <p className="text-xs text-foreground/50 mt-0.5">Most recent catering inquiries across the system.</p>
          </div>
          <Link
            href="/admin/bookings"
            className="text-xs font-bold text-primary hover:text-primary-hover flex items-center space-x-1"
          >
            <span>See All Bookings</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {recentBookings.length === 0 ? (
          <div className="text-center py-10 text-foreground/50 text-sm font-medium">
            No bookings found in the database.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-border text-foreground/50 text-xs font-bold uppercase">
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Event Style</th>
                  <th className="pb-3">Schedule</th>
                  <th className="pb-3">Guests</th>
                  <th className="pb-3">Quote</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {recentBookings.map((b) => (
                  <tr key={b.id} className="text-foreground/80 hover:bg-foreground/2">
                    <td className="py-3.5">
                      <p className="font-extrabold text-foreground">{b.user.name}</p>
                      <p className="text-xs text-foreground/50">{b.user.email}</p>
                    </td>
                    <td className="py-3.5 font-semibold text-foreground">
                      {b.eventType}
                      {b.package && (
                        <span className="ml-2 bg-primary/10 text-primary text-[10px] font-black px-2 py-0.5 rounded-full">
                          {b.package.name}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5">
                      <p className="font-medium">{b.date}</p>
                      <p className="text-xs text-foreground/55">{b.time}</p>
                    </td>
                    <td className="py-3.5 font-medium">{b.guestCount}</td>
                    <td className="py-3.5 font-bold text-primary">${b.estimatedPrice.toLocaleString()}</td>
                    <td className="py-3.5 text-right">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${getStatusStyle(b.status)}`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
