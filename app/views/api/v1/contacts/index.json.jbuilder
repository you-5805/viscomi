json.array! @contacts do |contact|
  json.extract! contact, :id, :subject, :content, :image, :sent_at_formatted
end