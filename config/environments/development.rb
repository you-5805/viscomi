Rails.application.configure do
  config.cache_classes = false

  config.eager_load = false

  config.consider_all_requests_local = true

  if Rails.root.join('tmp', 'caching-dev.txt').exist?
    config.action_controller.perform_caching = true
    config.action_controller.enable_fragment_cache_logging = true

    config.cache_store = :memory_store
    config.public_file_server.headers = {
      'Cache-Control' => "public, max-age=#{2.days.to_i}"
    }
  else
    config.action_controller.perform_caching = false

    config.cache_store = :null_store
  end

  config.active_storage.service = :local

  config.action_mailer.raise_delivery_errors = false

  config.action_mailer.perform_caching = false

  config.active_support.deprecation = :log

  config.active_record.migration_error = :page_load

  config.active_record.verbose_query_logs = true

  config.assets.debug = true

  config.assets.quiet = true

  # メーラー設定
  host = 'localhost:5000'
  config.action_mailer.default_url_options = { host: host, protocol: 'http' }
  config.action_mailer.raise_delivery_errors = true

  # letter_opener
  # config.action_mailer.delivery_method = :letter_opener

  # smtp
  config.action_mailer.delivery_method = :smtp
  
  # gmail
  mail = ENV['MAIL_ADDRESS']
  password = ENV['MAIL_PASSWORD']
  config.action_mailer.smtp_settings = {
    enable_starttls_auto: true,
    user_name:            mail,
    password:             password,
    port:                 '587',
    address:              'smtp.gmail.com',
    domain:               'gmail.com',
    authentication:       :plain
  }

  #sendgrid
  # api_key = ENV['VIS_SENDGRID_API_KEY']
  # config.action_mailer.smtp_settings = {
  #   enable_starttls_auto: true,
  #   user_name:            'apikey',
  #   password:             api_key,
  #   port:                 '587',
  #   address:              'smtp.sendgrid.net',
  #   domain:               'heroku.com',
  #   authentication:       :plain
  # }
end
