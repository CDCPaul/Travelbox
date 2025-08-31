'use client'

import { useAuth } from '@/lib/hooks/useAuth'
import { useSession } from '@/lib/hooks/useSession'
import AdminNavbar from '@/components/AdminNavbar'

export default function AdminSettingsPage() {
  const { user, loading: authLoading } = useAuth()
  const { 
    sessionInfo, 
    loading: sessionLoading, 
    refreshSession, 
    logout, 
    isExpiringSoon,
    minutesLeft 
  } = useSession()

  // 로딩 상태 처리
  if (authLoading || sessionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  // 인증되지 않은 상태
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="mb-4">You need to be logged in to access settings.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🧭 관리자 전용 네비게이션 */}
      <AdminNavbar
        user={user}
        sessionInfo={sessionInfo}
        onRefresh={async () => {
          const success = await refreshSession()
          return success
        }}
        onLogout={logout}
        isExpiringSoon={isExpiringSoon}
        minutesLeft={minutesLeft}
      />

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* ⚙️ Settings 헤더 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="mt-2 text-gray-600">Manage system configuration and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 🔧 System Settings */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">System Configuration</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    {/* Site Settings */}
                    <div>
                      <h4 className="text-md font-medium text-gray-900 mb-3">Site Settings</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                          <input 
                            type="text" 
                            defaultValue="Travel Box" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Site URL</label>
                          <input 
                            type="text" 
                            defaultValue="https://travelbox.com" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email Settings */}
                    <div>
                      <h4 className="text-md font-medium text-gray-900 mb-3">Email Configuration</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Host</label>
                          <input 
                            type="text" 
                            defaultValue="smtp.gmail.com" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Port</label>
                          <input 
                            type="number" 
                            defaultValue="587" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Payment Settings */}
                    <div>
                      <h4 className="text-md font-medium text-gray-900 mb-3">Payment Configuration</h4>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 mr-2" />
                          <span className="text-sm text-gray-700">Enable PayPal</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 mr-2" />
                          <span className="text-sm text-gray-700">Enable Stripe</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 mr-2" />
                          <span className="text-sm text-gray-700">Enable Cryptocurrency</span>
                        </label>
                      </div>
                    </div>

                    {/* Security Settings */}
                    <div>
                      <h4 className="text-md font-medium text-gray-900 mb-3">Security</h4>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 mr-2" />
                          <span className="text-sm text-gray-700">Enable Two-Factor Authentication</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 mr-2" />
                          <span className="text-sm text-gray-700">Force HTTPS</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 mr-2" />
                          <span className="text-sm text-gray-700">Enable IP Whitelist</span>
                        </label>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 font-medium mr-3">
                        Save Settings
                      </button>
                      <button className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 font-medium">
                        Reset to Defaults
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 📊 System Info & Actions */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* System Info */}
                <div className="bg-white shadow rounded-lg">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">System Information</h3>
                  </div>
                  <div className="p-6">
                    <dl className="space-y-3">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Version</dt>
                        <dd className="text-sm text-gray-900">v2.1.0</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Environment</dt>
                        <dd className="text-sm text-gray-900">Production</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Database</dt>
                        <dd className="text-sm text-gray-900">Firebase</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Server Status</dt>
                        <dd className="text-sm">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            🟢 Online
                          </span>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white shadow rounded-lg">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">
                        Clear Cache
                      </button>
                      <button className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm">
                        Backup Database
                      </button>
                      <button className="w-full bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 text-sm">
                        Update System
                      </button>
                      <button className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm">
                        Maintenance Mode
                      </button>
                    </div>
                  </div>
                </div>

                {/* Recent Logs */}
                <div className="bg-white shadow rounded-lg">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      <div className="text-xs text-gray-500">
                        <div className="font-medium">Settings updated</div>
                        <div>2 minutes ago</div>
                      </div>
                      <div className="text-xs text-gray-500">
                        <div className="font-medium">User login</div>
                        <div>15 minutes ago</div>
                      </div>
                      <div className="text-xs text-gray-500">
                        <div className="font-medium">Database backup</div>
                        <div>1 hour ago</div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        View all logs →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 🔴 관리자 페이지 - 완전 CSR 처리
export const dynamic = 'force-dynamic'




