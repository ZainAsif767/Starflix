defmodule Starflix.Repo do
  use Ecto.Repo,
    otp_app: :starflix,
    adapter: Ecto.Adapters.Postgres
end
