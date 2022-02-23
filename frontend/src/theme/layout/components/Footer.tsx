/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
const Footer: FC = () => {
  return (
    <div className="footer py-2 d-flex flex-lg-column px-20" id="kt_footer">
      {/* begin::Container */}
      <div
        className={`d-flex flex-column flex-md-row align-items-center justify-content-end`}
      >
        {/* begin::Copyright */}
        <div className="text-dark order-2 order-md-1 ml-auto">
          <span className="text-muted fw-bold me-2">
            {new Date().getFullYear()} &copy;
          </span>
          <a href="#" className="text-gray-800 text-hover-primary">
            Insurance Company
          </a>
        </div>
        {/* end::Copyright */}
      </div>
      {/* end::Container */}
    </div>
  );
};

export { Footer };
