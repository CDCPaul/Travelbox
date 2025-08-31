'use client'

import { useAuth } from '@/lib/hooks/useAuth'
import { useSession } from '@/lib/hooks/useSession'
import AdminNavbar from '@/components/AdminNavbar'

export default function AdminToursPage() {
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
          <p className="mb-4">You need to be logged in to access tours management.</p>
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
          {/* 🗺️ Tours 관리 헤더 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Tours Management</h1>
            <p className="mt-2 text-gray-600">Manage travel packages, destinations, and tour content</p>
          </div>

          {/* 📊 Tours 통계 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">🗺️</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Tours</dt>
                      <dd className="text-lg font-medium text-gray-900">24</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">✅</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Active Tours</dt>
                      <dd className="text-lg font-medium text-gray-900">18</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">⏳</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Draft Tours</dt>
                      <dd className="text-lg font-medium text-gray-900">6</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">🌍</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Countries</dt>
                      <dd className="text-lg font-medium text-gray-900">8</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 🛠️ Tours 액션 버튼 */}
          <div className="mb-8">
            <div className="flex space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium">
                + New Tour
              </button>
              <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 font-medium">
                Import Tours
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 font-medium">
                Export Data
              </button>
            </div>
          </div>

          {/* 📋 Tours 리스트 테이블 */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Tours</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tour</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Seoul City Tour</div>
                        <div className="text-sm text-gray-500">7 days package</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">South Korea</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$1,200</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Tokyo Adventure</div>
                        <div className="text-sm text-gray-500">5 days package</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Japan</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$980</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Draft</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
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




