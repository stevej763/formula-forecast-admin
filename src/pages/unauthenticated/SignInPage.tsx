import { useEffect, useState, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { setAccount } from "../../store/accountSlice";
import { login } from "../../api/authenticationApiClient";
import { getAccountDetails } from "../../api/accountDetailsApiClient";
import Button from "../../shared/components/Button";
import TextField from "../../shared/components/TextField";
import EnvironmentStrip from "../../shared/components/EnvironmentStrip";

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getAccountDetails()
      .then((account) => {
        if (account?.authenticated) {
          dispatch(setAccount({ account }));
          navigate("/weekends", { replace: true });
        }
      })
      .catch(() => {
        // Not signed in yet; stay on this page.
      });
  }, [dispatch, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Enter your email and password.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await login({ email, password });
      const account = await getAccountDetails();
      dispatch(setAccount({ account }));
      navigate("/weekends");
    } catch (err) {
      const status = isAxiosError(err) ? err.response?.status : undefined;
      if (status === 401 || status === 403) {
        setError("That email and password don't match an admin account.");
      } else if (isAxiosError(err) && !err.response) {
        setError("Can't reach the server. Check your connection and try again.");
      } else {
        setError("Sign-in failed on the server. Try again in a moment.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <EnvironmentStrip />
      <main className="flex flex-1 items-center px-6 py-12">
        <div className="mx-auto w-full max-w-sm">
          <img src="/logo-01-white-solid-no-background.png" alt="" className="mb-8 h-12 w-12 object-contain" />
          <h1 className="font-display text-4xl">Race control</h1>
          <p className="mt-3 text-ash">Sign in to manage seasons, teams, drivers and race weekends.</p>

          <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-5">
            <TextField
              id="email"
              label="Email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <p role="alert" className="border-l-2 border-signal pl-3 text-sm">
                {error}
              </p>
            )}
            <Button type="submit" block disabled={submitting} className="h-12 text-base">
              {submitting ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </div>
      </main>
      <footer className="px-6 py-6 text-sm text-ash">© {new Date().getFullYear()} Formula Forecast</footer>
    </div>
  );
};

export default SignInPage;
