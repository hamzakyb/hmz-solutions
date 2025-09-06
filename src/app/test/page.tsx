import Link from 'next/link'

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Style Test Page
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Test Card 1 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Styling</h2>
            <p className="text-gray-600 mb-4">This card should have proper styling with shadows and rounded corners.</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              Test Button
            </button>
          </div>
          
          {/* Test Card 2 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Gradient Text</h2>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
              This text should be gradient
            </h3>
            <p className="text-gray-600">If you can see colors and gradients, Tailwind is working correctly.</p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link 
            href="/" 
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Back to Main Site
          </Link>
        </div>
      </div>
    </div>
  )
}