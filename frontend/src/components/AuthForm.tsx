import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type AuthFormProps = {
  isLogin: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  values: { name: string, email: string, password: string };
  onChange: (field: string, value: string) => void;
  loading: boolean;
}

export const AuthForm = ({ isLogin, onSubmit, values, onChange, loading }: AuthFormProps) => {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      {!isLogin && (
        <div className="space-y-2">
          <Label>
            User name
          </Label>
          <Input
            id="userName"
            type="text"
            placeholder="user name"
            value={values.name}
            onChange={(e) => onChange('name', e.target.value)}
            required
          />
        </div>
      )}
      <div className="space-y-2">
        <Label>
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          value={values.email}
          onChange={(e) => onChange('email', e.target.value)}
          required 
        />
      </div>
      <div className="space-y-2">
        <Label >
          Password
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="password"
          value={values.password}
          onChange={(e) => onChange('password', e.target.value)}
          required 
        />
      </div>
      <Button className="w-full mt-4" type="submit" disabled={loading}>
        {isLogin ? 'Login' : 'Sign Up'}
      </Button>
    </form>
  )
}