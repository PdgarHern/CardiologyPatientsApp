class CheckToken::TokenController < ApplicationController
    require 'net/http'

    def check_token(token)
        url = URI.parse('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token='+token)
        req = Net::HTTP::Get.new(url.to_s)
        res = NET::HTTP.start(url.host, url.port) {|http|
            http.request(req)
        }

        render json: res
    end
end