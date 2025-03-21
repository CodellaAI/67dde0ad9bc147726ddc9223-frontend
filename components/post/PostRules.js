
export default function PostRules() {
  return (
    <div className="bg-white rounded-md shadow-sm p-4">
      <h2 className="text-base font-medium mb-4">Posting to Reddit</h2>
      
      <ol className="list-decimal list-inside text-sm space-y-3">
        <li className="text-gray-800">
          <span className="font-medium">Remember the human</span>
          <p className="text-gray-600 ml-5 mt-1">Behave like you would in real life</p>
        </li>
        <li className="text-gray-800">
          <span className="font-medium">Behave like you would in real life</span>
          <p className="text-gray-600 ml-5 mt-1">Look for the original source of content</p>
        </li>
        <li className="text-gray-800">
          <span className="font-medium">Look for the original source of content</span>
          <p className="text-gray-600 ml-5 mt-1">Search for duplicates before posting</p>
        </li>
        <li className="text-gray-800">
          <span className="font-medium">Search for duplicates before posting</span>
          <p className="text-gray-600 ml-5 mt-1">Read the community's rules</p>
        </li>
      </ol>
      
      <hr className="my-4" />
      
      <p className="text-xs text-gray-500">
        Please be mindful of reddit's <a href="#" className="text-blue-600 hover:underline">content policy</a> and practice good reddiquette.
      </p>
    </div>
  )
}
