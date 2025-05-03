interface TeamFormProps {
  form: string[]
}

export default function TeamForm({ form }: TeamFormProps) {
  return (
    <div className="flex space-x-1">
      {form.map((result, index) => (
        <span
          key={index}
          className={`inline-block w-5 h-5 text-xs flex items-center justify-center rounded-full ${
            result === "W"
              ? "bg-green-100 text-green-800"
              : result === "L"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800"
          }`}
        >
          {result}
        </span>
      ))}
    </div>
  )
}
