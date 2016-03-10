require 'sinatra'
require 'haml'
require 'phaxio'
require 'json'

get '/' do
  haml :resend_faxes
end

post '/resend_faxes' do
  fax_ids = params['fax_ids'].split("\r\n")
  api_key = params['api_key']
  api_secret = params['api_secret']
  configure_phaxio(api_key, api_secret)
  resend_faxes(fax_ids).to_json
end

def configure_phaxio(api_key, api_secret)
  Phaxio.config do |config|
    config.api_key = api_key
    config.api_secret = api_secret
  end
end

def resend_faxes(fax_ids)
  resend_fax_responses = []
  fax_ids.each do |fax_id|
    resend_fax_response = Phaxio.resend_fax(id: fax_id)
    resend_fax_response['faxId'] = fax_id
    resend_fax_responses << resend_fax_response.to_h
  end
  puts resend_fax_responses
  resend_fax_responses
end
