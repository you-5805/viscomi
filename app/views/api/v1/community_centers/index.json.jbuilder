json.array! @community_centers do |community_center|
  json.extract! community_center, :id, :name
end