class AcceptController < ActionController::Base

    def accept
        @invitation_token = params[:invitation_token]
        render "/accept"
    end 
end