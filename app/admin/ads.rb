ActiveAdmin.register Ad do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  # permit_params :owner_name, :content, :phone_number, :url
  #
  # or
  #
  permit_params do
    permitted = [:owner_name, :content, :phone_number, :url]
    permitted << :other if params[:action] == 'create' && current_user.admin?
    permitted
  end
  
end
